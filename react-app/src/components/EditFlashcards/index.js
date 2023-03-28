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

const EditFlashcards = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const [type, setType] = useState(params?.type)
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef();

    const session = useSelector(state => state.session)
    const classes = useSelector(state => state.classes)
    const chosenClass = classes?.allClasses[params?.class_id]
    const chosenDeck = chosenClass?.decks[params?.deck_id - 1]

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

    // if (classes?.allClasses && !classes.allClasses[params.id]?.id) history.push("/dashboard/loading")

    return (
        <div id="edit-flashcards-container">
            <Sidebar props={[session, userRelatedClasses, chosenClass]} />
            <div id="edit-flashcards-right">
                <div id="deck-flashcards-header">
                    <div id="deck-flashcards-header-left">
                        <div id="header-left-class">
                            <i className="fa-solid fa-angle-left" />
                            <img id="deck-header-class-image" src={chosenClass?.image} />
                            <p>{chosenClass?.name}</p>
                        </div>
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
                        <i className="fa-solid fa-pencil" />
                        <i className="fa-solid fa-ellipsis" />
                    </div>
                    <div id="deck-flashcards-header-right">

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
                <div id="deck-flashcards-option">
                    <div className={`deck-option-display ${type === "preview" ? "" : "hidden"}`}>
                        <PreviewCards />
                    </div>
                    <div className={`deck-option-display ${type === "edit" ? "" : "hidden"}`}>
                        <p>Edit hey hey hey</p>
                    </div>
                    <div className={`deck-option-display ${type === "browse" ? "" : "hidden"}`}>
                        <BrowseDeck />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditFlashcards
