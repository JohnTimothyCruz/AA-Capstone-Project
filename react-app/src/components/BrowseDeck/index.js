import { useEffect, useState } from "react";
import "./BrowseDeck.css"

const BrowseDeck = ({ props }) => {
    const [chosenDeck, setType] = props;
    const [currentCard, setCurrentCard] = useState(chosenDeck?.flashcards[0]);
    const [revealed, setRevealed] = useState(false);

    return (
        <div id="browse-deck-container">
            {currentCard ?
                <>
                    <div id="browse-deck-left">
                        <div id="browse-deck-flashcard">
                            <div id="browse-deck-flashcard-top">

                            </div>
                            <div id="browse-deck-flashcard-bottom">
                                {revealed ?
                                    <p>{currentCard.answer}</p>
                                    :
                                    <p>{currentCard.question}</p>
                                }
                            </div>
                        </div>
                        <div
                            id="browse-deck-reveal-button"
                            onClick={() => setRevealed(!revealed)}
                        >
                            {revealed ?
                                "REVEAL QUESTION"
                                :
                                "REVEAL ANSWER"
                            }
                        </div>
                    </div>
                    <i id="browse-deck-right" className="fa-solid fa-chevron-right" />
                </>
                :
                <div id="browse-empty-message-container">
                    <p id="browse-empty-prompt">Browse Deck not Available</p>
                    <p id="browse-empty-explaination">This Deck has no cards yet. Click Add Cards below to get started.</p>
                    <div id="browse-add-cards-button" onClick={() => setType("edit")}>ADD CARDS</div>
                </div>
            }
        </div>
    )
}

export default BrowseDeck
