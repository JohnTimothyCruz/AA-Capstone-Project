import { useEffect, useState } from "react";
import SingleEditFlashcard from "../SingleEditFlashcard"
import OpenModalButton from "../OpenModalButton";
import DeleteFlashcardModal from "../DeleteFlashcardModal"
import "./EditCards.css"

const EditCards = ({ props }) => {
    const [flashcards, chosenDeck] = props;
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        console.log(flashcards)
    }, [flashcards])

    return (
        <div id="edit-cards-page">
            <div id="edit-cards-left">
                <div id="edit-cards-number-container">
                    {flashcards && flashcards.map((flashcard, idx) => (
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
            </div>
            <div id="edit-cards-right">
                <div id="edit-cards-flashcards-container">
                    {flashcards && flashcards.map((flashcard, idx) => (
                        <div className="single-flashcard-container" key={idx}>
                            {console.log(flashcard?.id)}
                            <h2>{idx + 1}</h2>
                            <SingleEditFlashcard props={[flashcard, "edit", chosenDeck, idx]} />
                            <OpenModalButton
                                modalComponent={<DeleteFlashcardModal props={[flashcard, idx]} />}
                                buttonText={<i className="single-flashcard-delete-flashcard fa-solid fa-xmark" />}
                            />
                        </div>
                    ))}
                    <div className="single-flashcard-container new">
                        <h3>New Card</h3>
                        <SingleEditFlashcard props={[null, "create", chosenDeck, "new"]} />
                        <div id="single-flashcard-new-take-space"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCards
