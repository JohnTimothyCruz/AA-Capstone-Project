import DeckObjectiveModal from "../DeckObjectiveModal";
import DeleteDeckModal from "../DeleteDeckModal";
import PreviewFlashcardsModal from "../PreviewFlashcardsModal";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { useRef } from "react";
import EditDeckModal from "../EditDeckModal";
import NoCardsModal from "../NoCardsModal"
import "./SingleDeck.css"

const SingleDeck = ({ props }) => {
    const history = useHistory();
    const [deck, chosenClass, session] = props;
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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

    const body = (
        <>
            <div className="deck-container-left">
                <div className="deck-container-circle"></div>
                <div className="deck-progress-percent">%</div>
                <div className=" deck-info-container">
                    <div className="deck-name">{deck.name}</div>
                    <div className="deck-progress-bar"></div>
                </div>
            </div>
            <div className={`deck-container-right ${deck?.flashcards?.length ? "" : "empty"}`}>
                <div onClick={(e) => e.stopPropagation()} className={`deck-container-preview ${session?.user?.id === chosenClass?.user?.id ? deck?.flashcards?.length ? "" : "hidden" : "hidden"}`}>
                    <OpenModalButton
                        modalComponent={<PreviewFlashcardsModal />}
                        buttonText={<i className="fa-solid fa-glasses fa-lg" />}
                    />
                </div>
                {session?.user?.id === chosenClass?.user?.id &&
                    <i onClick={(e) => {
                        e.stopPropagation()
                        history.push(`/dashboard/classes/${chosenClass.id}/decks/${deck.id}/flashcards/edit`)
                    }} className="deck-container-right-icons deck-container-edit fa-solid fa-pencil fa-lg" />
                }
                <i onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(true)
                }} className="deck-container-right-icons deck-container-options fa-solid fa-ellipsis fa-lg" />
                <div className="popup-wrapper">
                    <div className={`deck-pop-up-container ${showMenu ? "" : "hidden"}`}>
                        {session?.user?.id === chosenClass?.user?.id ?
                            <div>
                                <div className="deck-pop-up-section" onClick={(e) => {e.stopPropagation()}}>
                                    <OpenModalButton
                                        buttonText={
                                            <>
                                                <i className="fa-solid fa-circle-info" />
                                                <p>Deck Objective</p>
                                            </>
                                        }
                                        modalComponent={<DeckObjectiveModal props={[deck]} />}
                                    />
                                </div>
                                <div className="deck-pop-up-section" onClick={(e) => e.stopPropagation()}>
                                    <OpenModalButton
                                        buttonText={
                                            <>
                                                <i className="fa-solid fa-pencil" />
                                                <p>Edit Deck Info</p>
                                            </>
                                        }
                                        modalComponent={<EditDeckModal props={[chosenClass, deck]} />}
                                    />
                                </div>
                                <div className="deck-pop-up-section" onClick={(e) => e.stopPropagation()}>
                                    <OpenModalButton
                                        buttonText={<>
                                            <i className="fa-solid fa-xmark" />
                                            <p>Remove this Deck</p>
                                        </>}
                                        modalComponent={<DeleteDeckModal props={[chosenClass, deck]} />}
                                    />
                                </div>
                            </div>
                            :
                            <div className="deck-pop-up-section" onClick={(e) => e.stopPropagation()}>
                                <OpenModalButton
                                    buttonText={
                                        <>
                                            <i className="fa-solid fa-circle-info" />
                                            <p>Deck Objective</p>
                                        </>
                                    }
                                    modalComponent={<DeckObjectiveModal />}
                                />
                            </div>
                        }
                    </div>
                </div>
                {session?.user?.id === chosenClass?.user?.id &&
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            history.push(`/dashboard/classes/${chosenClass.id}/decks/${deck.id}/flashcards/edit`)
                        }}
                        className="deck-container-add">
                        ADD CARDS
                    </div>
                }
                <i className="deck-container-right-icons deck-container-study fa-solid fa-circle-play fa-lg" />
                <i onClick={(e) => {
                    e.stopPropagation()
                    history.push(`/dashboard/classes/${chosenClass.id}/decks/${deck.id}/flashcards/preview`)
                }} className="deck-container-right-icons deck-container-view fa-solid fa-angle-right fa-lg" />
            </div>
        </>
    )

    return (
        deck?.flashcards?.length ?
            <div className="deck-container" onClick={() => history.push(`/study/decks/${deck?.id}`)}>
                {body}
            </div>
            :
            <div className="deck-container empty">
                <OpenModalButton
                    modalComponent={<NoCardsModal />}
                    buttonText={body}
                />
            </div>
    )
}

export default SingleDeck
