import { useState } from "react";
import "./SingleEditFlashcard.css"

const SingleEditFlashcard = ({ props }) => {
    const [flashcard, type] = props;
    const [answer, setAnswer] = useState(flashcard?.answer)
    const [question, setQuestion] = useState(flashcard?.question)
    const [answerImage, setAnswerImage] = useState(flashcard?.answer_image)
    const [questionImage, setQuestionImage] = useState(flashcard?.question_image)

    const growInput = (el) => {
        el.style.height = "7px";
        el.style.height = (el.scrollHeight) + "px";
    }

    const handleSubmit = () => {
        if (type === "create") {
            console.log("create")
        } else {
            console.log("edit")
        }
    }

    return (
            <div className="single-edit-flashcard">
                <form className="single-edit-flashcard-form">
                    <div className="single-edit-flashcard-input-container">
                        <p>Q</p>
                        <textarea
                            className="flashcard-form-input"
                            value={question || ""}
                            onInput={(e) => growInput(e.target)}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Question"
                        />
                    </div>
                    <div className="single-edit-flashcard-input-container">
                        <p>A</p>
                        <textarea
                            className="flashcard-form-input"
                            value={answer || ""}
                            onInput={(e) => growInput(e.target)}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Answer"
                        />
                    </div>
                </form>
                <div
                    onClick={() => handleSubmit()}
                    className="single-edit-flashcard-save-button"
                >
                    SAVE
                </div>
            </div>
    )
}

export default SingleEditFlashcard
