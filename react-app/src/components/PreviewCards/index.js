import "./PreviewCards.css"

const PreviewCards = ({ props }) => {
    const [flashcard, idx] = props

    return (
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
    )
}

export default PreviewCards
