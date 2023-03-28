import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import CreateDeckModal from "../CreateDeckModal";
import OpenModalButton from "../OpenModalButton";
import SingleDeck from "../SingleDeck";
import "./ClassDecks.css"

const ClassDecks = ({ props }) => {
    const history = useHistory();
    const [session, chosenClass] = props;

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
                <SingleDeck props={[deck, chosenClass, session]} key={idx} />
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
