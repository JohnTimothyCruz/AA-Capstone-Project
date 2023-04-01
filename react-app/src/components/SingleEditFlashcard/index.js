import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postFlashcard, putFlashcard } from "../../store/decks";
import "./SingleEditFlashcard.css"

const SingleEditFlashcard = ({ props }) => {
    const dispatch = useDispatch()
    const [flashcard, type, chosenDeck, idx] = props;
    const [answer, setAnswer] = useState(flashcard?.answer || "")
    const [question, setQuestion] = useState(flashcard?.question || "")
    const [answerImage, setAnswerImage] = useState(flashcard?.answer_image || "")
    const [questionImage, setQuestionImage] = useState(flashcard?.question_image || "")
    const [showButtons, setShowButtons] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (type === "edit") {
            if (answer !== flashcard?.answer || question !== flashcard?.question) {
                setShowButtons(true)
            }
        } else {
            if (answer?.length || question?.length) {
                setShowButtons(true)
            }
        }
        if (flashcard?.answer_image || flashcard?.question_image) {
            if ((answerImage !== flashcard?.answer_image && answerImage?.length) || (questionImage?.length && questionImage !== flashcard?.question_image)) {
                setShowButtons(true)
            }
        } else {
            if (answerImage?.length || questionImage?.length) {
                setShowButtons(true)
            }
        }

        const errs = [];
        if (answer?.length > 250) {
            errs.push("Answer text must be less than 250 characters")
        }
        if (question?.length > 250) {
            errs.push("Question text must be less than 250 characters")
        }
        if (answerImage && !answerImage.endsWith(".jpg") && !answerImage.endsWith(".jpeg") && !answerImage.endsWith(".png") && !answerImage.endsWith(".gif")) {
            errs.push("Answer image must end with .jpg, .jpeg, .png, or .gif")
        }
        if (questionImage && !questionImage.endsWith(".jpg") && !questionImage.endsWith(".jpeg") && !questionImage.endsWith(".png") && !questionImage.endsWith(".gif")) {
            errs.push("Question image must end with .jpg, .jpeg, .png, or .gif")
        }
        setErrors(errs)

    }, [question, answer, questionImage, answerImage])

    const growInput = () => {
        const textareas = document.getElementsByClassName(`flashcard-form-input ${idx}`)
        for (const el of textareas) {
            el.style.height = "7px";
            el.style.height = (el.scrollHeight) + "px";
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type === "create") {
            dispatch(postFlashcard(question, answer, questionImage, answerImage, chosenDeck?.id))
                .then(setAnswer(""))
                .then(setQuestion(""))
                .then(setQuestionImage(""))
                .then(setAnswerImage(""))
                .then(setShowButtons(false))
        } else {
            dispatch(putFlashcard(question, answer, questionImage, answerImage, chosenDeck?.id, flashcard?.id))
                .then(setShowButtons(false))
        }
    }

    return (
        <div id={`flashcard-number-${idx}`} className="single-edit-flashcard-container">
            <div className="single-edit-flashcard">
                <form onSubmit={(e) => handleSubmit(e)} className="single-edit-flashcard-form">
                    <div className="single-edit-flashcard-input-container">
                        <div className="single-edit-flashcard-top">
                            <p>Q</p>
                            <textarea
                                className={`flashcard-form-input-textarea ${idx}`}
                                value={question || ""}
                                onInput={() => growInput()}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Question"
                            />
                        </div>
                        <div className="single-edit-flashcard-bottom">
                            <p>Image Url (optional)</p>
                            <input
                                className="flashcard-form-input-input"
                                value={questionImage || ""}
                                onChange={(e) => setQuestionImage(e.target.value)}
                                placeholder="Question Image"
                            />
                        </div>
                    </div>
                    <div className="single-edit-flashcard-input-container">
                        <div className="single-edit-flashcard-top">
                            <p>A</p>
                            <textarea
                                className={`flashcard-form-input-textarea ${idx}`}
                                value={answer || ""}
                                onInput={() => growInput()}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Answer"
                            />
                        </div>
                        <div className="single-edit-flashcard-bottom">
                            <p>Image Url (optional)</p>
                            <input
                                className="flashcard-form-input-input"
                                value={answerImage || ""}
                                onChange={(e) => setAnswerImage(e.target.value)}
                                placeholder="Answer Image"
                            />
                        </div>
                    </div>
                    <div
                        className={`single-edit-flashcard-button-container ${showButtons ? "show" : "hidden"}`}
                    >
                        <div
                            className="single-edit-flashcard-cancel-button"
                            onClick={() => {
                                setAnswer(flashcard?.answer)
                                setQuestion(flashcard?.question)
                                setQuestionImage(flashcard?.question_image)
                                setAnswerImage(flashcard?.answer_image)
                                setShowButtons(false)
                            }}
                        >
                            Discard changes
                        </div>
                        <button
                            className="single-edit-flashcard-save-button"
                            disabled={answer === "" || question === "" || errors.length}
                        >
                            SAVE
                        </button>
                    </div>
                </form>
                {errors?.length ?
                    <div id="edit-cards-errors">
                        {errors.map((error, idx) => (
                            <>
                            <div className="edit-cards-error" key={idx}>{error}</div>
                            </>
                        ))}
                    </div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default SingleEditFlashcard
