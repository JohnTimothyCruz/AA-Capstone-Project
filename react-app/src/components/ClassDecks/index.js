import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import CreateDeckModal from "../CreateDeckModal";
import DeckObjectiveModal from "../DeckObjectiveModal";
import DeleteDeckModal from "../DeleteDeckModal";
import EditDeckModal from "../EditDeckModal";
import OpenModalButton from "../OpenModalButton";
import PreviewFlashcardsModal from "../PreviewFlashcardsModal";
import "./ClassDecks.css"

const ClassDecks = ({ props }) => {
    const history = useHistory();
    const [session, chosenClass] = props;
    const [openEditMenu, setOpenEditMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        if (!openEditMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current?.contains(e.target)) {
                setOpenEditMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [openEditMenu]);

    return (
        <div id="dashboard-decks-container">
            <div id="dashboard-decks-prompt">
                <div id="dashboard-decks-prompt-left">
                    {/* <i className="fa-regular fa-circle fa-xl" /> */}
                    <div>Decks</div>
                </div>
                <div id="dashboard-decks-prompt-right">
                    <OpenModalButton
                        modalComponent={<CreateDeckModal props={[chosenClass, session.user.id]} />}
                        buttonText={<i className="fa-solid fa-circle-plus fa-xl" />}
                    />
                </div>
            </div>
            {chosenClass?.decks?.length ? chosenClass?.decks.map((deck, idx) => (
                <div className="deck-container" onClick={() => history.push(`/study/decks/${deck?.id}`)} key={idx}>
                    <div className="deck-container-left">
                        <i className="fa-regular fa-circle fa-xl" />
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
                        <i onClick={(e) => e.stopPropagation()} className="deck-container-right-icons deck-container-edit fa-solid fa-pencil fa-lg" />
                        <i onClick={(e) => {
                            e.stopPropagation()
                            setOpenEditMenu(true)
                        }} className="deck-container-right-icons deck-container-options fa-solid fa-ellipsis fa-lg" />
                        <div className={`deck-pop-up-container ${openEditMenu ? "" : "hidden"}`}>
                            {session?.user?.id === chosenClass?.user?.id ?
                                <>
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
                                    <div className="deck-pop-up-section" onClick={(e) => e.stopPropagation()}>
                                        <OpenModalButton
                                            buttonText={
                                                <>
                                                    <i class="fa-solid fa-pencil" />
                                                    <p>Edit Deck Info</p>
                                                </>
                                            }
                                            modalComponent={<EditDeckModal />}
                                        />
                                    </div>
                                    <div className="deck-pop-up-section" onClick={(e) => e.stopPropagation()}>
                                        <OpenModalButton
                                            buttonText={<>
                                                <i className="fa-solid fa-xmark" />
                                                <p>Remove this Deck</p>
                                            </>}
                                            modalComponent={<DeleteDeckModal />}
                                        />
                                    </div>
                                </>
                                :
                                <div onClick={(e) => e.stopPropagation()}>
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
                        <div onClick={(e) => e.stopPropagation()} className="deck-container-add">ADD CARDS</div>
                        <i className="deck-container-right-icons deck-container-study fa-solid fa-circle-play fa-lg" />
                        <i onClick={(e) => e.stopPropagation()} className="deck-container-right-icons deck-container-view fa-solid fa-angle-right fa-lg" />
                    </div>
                </div>
            ))
                :
                <div id="empty-deck-message-container">
                    <h2 id="empty-deck-prompt">Add Decks to your Class</h2>
                    <p id="empty-deck-message"><b>Your Class has no Decks.</b> A Deck is a collection of Flashcards in a Class, similar to chapters in a book. Add a Deck to get started.</p>
                    <OpenModalButton
                        buttonText="Create New Deck"
                        modalComponent={<CreateDeckModal props={[chosenClass, session?.user?.id]} />}
                    />
                </div>
            }
        </div>
    )
}

export default ClassDecks
