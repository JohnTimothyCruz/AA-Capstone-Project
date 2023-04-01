import { useModal } from "../../context/Modal";
import "./PreviewFlashcardsModal.css"

const PreviewFlashcardsModal = ({ props }) => {
    const { closeModal } = useModal();
    const [deck] = props

    return (
        <div id="preview-cards-modal">
            <i id="close-preview-cards-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()} />
            <h2 id="preview-cards-prompt">{deck?.name} Flashcards Preview</h2>
            <div id="preview-cards-container">
                {deck?.flashcards && deck?.flashcards.map((flashcard, idx) => (
                    <div className="preview-cards-container">
                        <div className="preview-single-card-number">
                            {idx + 1}
                        </div>
                        <div className="preview-single-card">
                            <div className="preview-single-card-question-container">
                                <h2 className="preview-top-left-letter">Q</h2>
                                <div className="flashcard-content-container">
                                    <p>{flashcard?.question}</p>
                                    <img src={flashcard?.question_image} alt="question"/>
                                </div>
                            </div>
                            <div className="preview-single-card-answer-container">
                                <h2 className="preview-top-left-letter">A</h2>
                                <div className="flashcard-content-container">
                                    <p>{flashcard?.answer}</p>
                                    <img src={flashcard?.answer_image} alt="answer"/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default PreviewFlashcardsModal
