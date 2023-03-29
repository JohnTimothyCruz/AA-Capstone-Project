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

const EditFlashcards = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const [type, setType] = useState(params?.type)
    const [showMenu, setShowMenu] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const ulRef = useRef();

    const session = useSelector(state => state.session)
    const classes = useSelector(state => state.classes)
    const chosenClass = classes?.allClasses[params?.class_id]
    const getChoseDeck = () => {
        if (chosenClass?.decks) {
            for (const deck of chosenClass?.decks) {
                if (deck.id == params?.deck_id) {
                    return deck
                }
            }
        }
    }
    const chosenDeck = getChoseDeck()

    const [editing, setEditing] = useState(false)
    const [deckTitle, setDeckTitle] = useState(chosenDeck?.name)

    useEffect(() => {
        dispatch(getClasses())
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


    const getUserRelatedClasses = () => {
        const userClasses = session?.user?.classes
        const res = []
        if (userClasses) {
            for (const c of userClasses) {
                res.push(classes.allClasses[c.id])
            }
        }

        const joinedClasses = session?.user?.learning
        if (joinedClasses) {
            for (const c of Object.values(joinedClasses)) {
                if (classes?.allClasses[c.class_id]?.user_id !== session?.user?.id) {
                    res.push(classes?.allClasses[c.class_id])
                }
            }
        }

        return res
    }

    const userRelatedClasses = getUserRelatedClasses()

    const handleRename = (e) => {
        e.preventDefault()

        if (deckTitle !== chosenDeck?.name) {
            dispatch(putDeck(deckTitle, chosenDeck.objective, chosenDeck.id, chosenClass.id))
            setEditing(false)
        }
    }

    // if (classes?.allClasses && !classes.allClasses[params.id]?.id) history.push("/dashboard/loading")
    // if (userRelatedClasses.length && !classes.allClasses[params?.class_id]) console.log("!!!")

    return (
        <div id="edit-flashcards-container">
            <Sidebar props={[session, userRelatedClasses, chosenClass]} />
            <div id="edit-flashcards-right">
                <div id="deck-flashcards-header">
                    <div id="deck-flashcards-header-left">
                        <div id="header-left-class" onClick={() => history.push(`/dashboard/classes/${chosenClass?.id}`)}>
                            <i className="fa-solid fa-angle-left" />
                            <img id="deck-header-class-image" src={chosenClass?.image} />
                            <p>{chosenClass?.name}</p>
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
                        <i className="fa-solid fa-ellipsis" />
                    </div>
                    <div id="deck-flashcards-header-right">
                        <p>STUDY DECK</p>
                        <i className="fa-solid fa-circle-play" />
                    </div>
                </div>
                <div id="deck-flashcards-options-menu">
                    <div className={`deck-flashcards-option ${type === "preview" ? "chosen" : ""}`} onClick={() => setType("preview")}>
                        <p>
                            Preview Cards
                        </p>
                    </div>
                    <div className={`deck-flashcards-option ${type === "edit" ? "chosen" : ""}`} onClick={() => setType("edit")}>
                        <p>
                            Edit Cards
                        </p>
                    </div>
                    <div className={`deck-flashcards-option ${type === "browse" ? "chosen" : ""}`} onClick={() => setType("browse")}>
                        <p>
                            Browse Deck
                        </p>
                    </div>
                </div>
                <div id="deck-flashcards-option-container">
                    <div className={`deck-option-display ${type === "preview" ? "" : "hidden"}`}>
                        <PreviewCards />
                    </div>
                    <div className={`deck-option-display ${type === "edit" ? "" : "hidden"}`}>
                        <p>Edit hey hey hey</p>
                    </div>
                    <div className={`deck-option-display ${type === "browse" ? "" : "hidden"}`}>
                        <BrowseDeck props={[chosenDeck, setType]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditFlashcards
