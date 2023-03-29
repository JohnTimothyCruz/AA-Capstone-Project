import { useEffect, useState } from "react";
import "./BrowseDeck.css"

const BrowseDeck = ({ props }) => {
    const [chosenDeck, setType] = props;
    const [cardNumber, setCardNumber] = useState(0)
    const [currentCard, setCurrentCard] = useState(chosenDeck?.flashcards[cardNumber]);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        setCurrentCard(chosenDeck?.flashcards[cardNumber])
    }, [chosenDeck, cardNumber])

    const handleChangeCard = (n) => {
        setRevealed(false)
        setCardNumber(cardNumber + n)
    }

    return (
        <div id="browse-deck-container" className={currentCard ? "" : "empty-deck"}>
            {currentCard ?
                <div id="browse-deck-flashcard-container">
                    <i
                        id="browse-deck-left"
                        className={`fa-solid fa-chevron-left fa-2xl ${chosenDeck?.flashcards[cardNumber - 1] ? "" : "invisible"}`}
                        onClick={() => handleChangeCard(-1)}
                    />
                    <div id="browse-deck-middle">
                        <div id="browse-deck-flashcard">
                            <div id="browse-deck-flashcard-top">
                                {`${cardNumber + 1} of ${chosenDeck?.flashcards?.length}`}
                            </div>
                            <div id="browse-deck-flashcard-bottom">
                                {revealed ?
                                    <>
                                        <p>{currentCard.answer}</p>
                                        {currentCard?.answer_image ?
                                            <img id="browse-answer-image" src={currentCard.answer_image} alt="answer" />
                                            :
                                            <p className="hidden"></p>
                                        }
                                    </>
                                    :
                                    <>
                                        <p id="browse-question-text">{currentCard.question}</p>
                                        {currentCard?.question_image ?
                                            <img id="browse-question-image" src={currentCard.question_image} alt="answer" />
                                            :
                                            <p className="hidden"></p>
                                        }
                                    </>
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
                    <i
                        id="browse-deck-right"
                        className={`fa-solid fa-chevron-right fa-2xl ${chosenDeck?.flashcards[cardNumber + 1] ? "" : "invisible"}`}
                        onClick={() => handleChangeCard(1)}
                    />
                </div>
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
