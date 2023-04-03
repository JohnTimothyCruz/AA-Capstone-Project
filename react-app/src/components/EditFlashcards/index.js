import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getClasses } from "../../store/classes";
import CreateDeckModal from "../CreateDeckModal";
import Sidebar from "../Sidebar";
import "./EditFlashcards.css"
import PreviewCards from "../PreviewCards";
import BrowseDeck from "../BrowseDeck";
import OpenModalButton from "../OpenModalButton";
import { putDeck } from "../../store/decks"
import { getDeck } from "../../store/decks";
import SingleEditFlashcard from "../SingleEditFlashcard";
import DeleteFlashcardModal from "../DeleteFlashcardModal";

const EditFlashcards = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const [type, setType] = useState(params?.type)
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef();

    const session = useSelector(state => state.session)
    const classes = useSelector(state => state.classes)
    const chosenClass = classes?.allClasses[params?.classId]
    const chosenDeck = useSelector(state => state.decks.singleDeck)

    const [editing, setEditing] = useState(false)
    const [deckTitle, setDeckTitle] = useState(chosenDeck?.name)

    useEffect(() => {
        dispatch(getClasses())
        dispatch(getDeck(params.deckId))
    }, [dispatch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current?.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleRename = (e) => {
        e.preventDefault()

        if (deckTitle !== chosenDeck?.name) {
            dispatch(putDeck(deckTitle, chosenDeck.objective, chosenDeck.id, chosenClass.id))
            setEditing(false)
        }
    }

    return (
        <div id="edit-flashcards-container">
            <Sidebar />
            <div id="edit-flashcards-right">
                <div id="deck-flashcards-header">
                    <div id="deck-flashcards-header-left">
                        <div id="header-left-class" onClick={() => history.push(`/dashboard/classes/${chosenClass?.id}`)}>
                            <i className="fa-solid fa-angle-left" />
                            <img id="deck-header-class-image" src={chosenClass?.image} alt="class" />
                            <p id="header-left-class-name">{chosenClass?.name}</p>
                        </div>
                        {editing ?
                            <form id="edit-deck-title-form" onSubmit={(e) => handleRename(e)}>
                                <input
                                    id="edit-deck-title-input"
                                    placeholder="Enter Deck Name"
                                    onChange={(e) => setDeckTitle(e.target.value)}
                                    value={deckTitle || ""}
                                />
                                <i
                                    id="cancel-edit-deck-title-button"
                                    className="fa-solid fa-xmark fa-xl"
                                    onClick={() => {
                                        setEditing(false)
                                        setDeckTitle(chosenDeck.name)
                                    }}
                                />
                                <button
                                    id="submit-edit-deck-title-button"
                                    disabled={!deckTitle}
                                >Save</button>
                            </form>
                            :
                            <>
                                <div id="decks-drop-down" onClick={() => setShowMenu(!showMenu)}>
                                    <p>{chosenDeck?.name}</p>
                                    <i className="fa-solid fa-caret-down" />
                                    <div id="decks-popup" className={`${showMenu ? "" : "hidden"}`}>
                                        {chosenClass && chosenClass.decks.map((deck, idx) => (
                                            <div
                                                className="decks-popup-section"
                                                onClick={() => {
                                                    setShowMenu(false)
                                                    history.push(`/dashboard/classes/${chosenClass?.id}/decks/${deck?.id}/flashcards/${type}`)
                                                }}
                                                key={idx}
                                            >
                                                {deck.name}
                                            </div>
                                        ))}
                                        <OpenModalButton
                                            buttonText="Create New Deck..."
                                            modalComponent={<CreateDeckModal props={[chosenClass, session?.user?.id]} />}
                                        />
                                    </div>
                                </div>
                                <i onClick={() => setEditing(true)} className="fa-solid fa-pencil" />
                            </>
                        }
                    </div>
                    <div id="deck-flashcards-header-right">
                        <p>STUDY DECK</p>
                        <i className="fa-solid fa-circle-play" />
                    </div>
                </div>
                <div id="deck-flashcards-options-menu">
                    <div className={`deck-flashcards-option ${params?.type === "preview" ? "chosen" : ""}`} onClick={() => history.push(`/dashboard/classes/${chosenDeck?.class_id}/decks/${chosenDeck?.id}/flashcards/preview`)}>
                        <p>
                            Preview Cards
                        </p>
                    </div>
                    {session?.user?.id === chosenClass?.user_id &&
                        <div className={`deck-flashcards-option ${params?.type === "edit" ? "chosen" : ""}`} onClick={() => history.push(`/dashboard/classes/${chosenDeck?.class_id}/decks/${chosenDeck?.id}/flashcards/edit`)}>
                            <p>
                                Edit Cards
                            </p>
                        </div>
                    }
                    <div className={`deck-flashcards-option ${params?.type === "browse" ? "chosen" : ""}`} onClick={() => history.push(`/dashboard/classes/${chosenDeck?.class_id}/decks/${chosenDeck?.id}/flashcards/browse`)}>
                        <p>
                            Browse Deck
                        </p>
                    </div>
                </div>
                <div id="deck-flashcards-option-container">
                    <div className={`deck-option-display preview ${params?.type === "preview" ? "" : "hidden"}`}>
                        {chosenDeck?.flashcards?.length ? chosenDeck?.flashcards.map((flashcard, idx) => (
                            <div key={idx}>
                                <PreviewCards props={[flashcard, idx]} />
                            </div>
                        ))
                            :
                            <div id="preview-empty-message-container">
                                <p id="preview-empty-prompt">Preview Deck not Available</p>
                                {session?.user?.id === chosenClass?.user_id ?
                                    <>
                                        <p id="preview-empty-explaination">This Deck has no cards yet. Click Add Cards below to get started.</p>
                                        <div id="preview-add-cards-button" onClick={() => setType("edit")}>ADD CARDS</div>
                                    </>
                                    :
                                    <p id="preview-empty-explaination">This Deck has no cards yet. If you know the class owner, please ask them to create cards to study.</p>
                                }
                            </div>
                        }
                    </div>
                    {session?.user?.id === chosenClass?.user_id &&
                        <div className={`deck-option-display ${params?.type === "edit" ? "" : "hidden"}`}>
                            <div id="edit-cards-page">
                                {/* <div id="edit-cards-left">
                                    <div id="edit-cards-number-container">
                                        {chosenDeck?.flashcards?.length && chosenDeck?.flashcards.map((flashcard, idx) => (
                                            <div
                                                onClick={() => setSelected(idx)}
                                                className={`single-flashcard-number-container ${selected === idx ? "selected" : ""}`}
                                                key={idx}
                                            >
                                                <div className="single-flashcard-number">
                                                    {idx + 1}
                                                </div>
                                            </div>
                                        ))}
                                        <div
                                            onClick={() => setSelected("new")}
                                            className={`single-flashcard-number-container ${selected === "new" ? "selected" : ""}`}
                                        >
                                            <div className="single-flashcard-number new">
                                                New
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div id="edit-cards-right">
                                    <div id="edit-cards-flashcards-container">
                                        {chosenDeck?.flashcards?.length ? chosenDeck?.flashcards.map((flashcard, idx) => (
                                            <div className="single-flashcard-container" key={flashcard?.id}>
                                                {console.log(flashcard.answer)}
                                                <h2>{idx + 1}</h2>
                                                <SingleEditFlashcard props={[flashcard, "edit", chosenDeck, idx]} />
                                                <OpenModalButton
                                                    modalComponent={<DeleteFlashcardModal props={[chosenDeck, flashcard, idx]} />}
                                                    buttonText={<i className="single-flashcard-delete-flashcard fa-solid fa-xmark" />}
                                                />
                                            </div>
                                        ))
                                            :
                                            <div></div>
                                        }
                                        <div className="single-flashcard-container new">
                                            <h3>New Card</h3>
                                            <SingleEditFlashcard props={[null, "create", chosenDeck, "new"]} />
                                            <div id="single-flashcard-new-take-space"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={`deck-option-display ${params?.type === "browse" ? "" : "hidden"}`}>
                        <BrowseDeck props={[session, chosenClass, chosenDeck, setType]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditFlashcards
