import { useHistory, useParams } from "react-router-dom"
import "./StudyPage.css"
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton";
import { useEffect } from "react"
import { getDeck } from "../../store/decks"
import { useState } from "react"
import PreviewFlashcardsModal from "../PreviewFlashcardsModal";
import { getClasses, postStudied, putLearnerCardsStudied, putLearnerDaysStudied, putLearnerTime } from "../../store/classes";

const StudyPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()
    const deck = useSelector(state => state.decks)
    const classes = useSelector(state => state.classes)
    const session = useSelector(state => state.session)

    const [chosenDeck, setChosenDeck] = useState(deck.singleDeck)
    const [cardNumber, setCardNumber] = useState(0)
    const [currentCard, setCurrentCard] = useState(chosenDeck?.flashcards?.length ? chosenDeck?.flashcards[cardNumber] : null);
    const [revealed, setRevealed] = useState(false);

    useEffect(async () => {
        // Warning with await in use Effect
        dispatch(getClasses())
        const chosenDeck = await dispatch(getDeck(params.deckId))
        setCurrentCard(chosenDeck?.flashcards[0])
        setChosenDeck(chosenDeck)
    }, [dispatch])

    useEffect(() => {
        if (chosenDeck?.flashcards?.length) {
            setCurrentCard(chosenDeck?.flashcards[cardNumber])
        }
    }, [cardNumber])

    useEffect(async () => {
        // Warning with await in use Effect
        const minutesInterval = setInterval(() => {
            if (Object.values(chosenDeck).length) {
                dispatch(putLearnerTime(deck.singleDeck?.class_id, session?.user?.id))
            }
        }, 60000)

        return () => clearInterval(minutesInterval)
    }, [])

    const getLearner = () => {
        if (classes?.allClasses[chosenDeck?.class_id]) {
            for (const l of Object.values(classes?.allClasses[chosenDeck?.class_id].learners)) {
                if (l.user_id === session.user.id) {
                    return l
                }
            }
        }
    }
    const handleReveal = () => {
        if (new Date(getLearner().last_studied).getTime() < Date.now() && new Date(getLearner().last_studied).getDate() !== new Date().getDate()) {
            dispatch(putLearnerDaysStudied(chosenDeck?.class_id, session?.user?.id))
        }

        const cards = getLearner().studied_cards.filter(card => card.flashcard_id === currentCard?.id && card.learner_id === getLearner()?.id && card?.deck_id === chosenDeck?.id)
        if (!cards.length) {
            dispatch(postStudied(currentCard?.id, getLearner()?.id, chosenDeck?.class_id, chosenDeck?.id))
        }

        dispatch(putLearnerCardsStudied(chosenDeck?.class_id, session?.user?.id))
        setRevealed(true)
    }

    return (
        <div id="study-page-container">
            <div id="study-page-side-bar">
                <div id="study-page-side-bar-top">
                    <div id="back-to-dashboard-button" onClick={() => history.push("/dashboard")}>
                        <i className="fa-solid fa-chevron-left" />
                        <i className="study-page-logo-icon fa-solid fa-robot fa-2xl" />
                    </div>
                    <div id="class-info-button" onClick={() => history.push(`/dashboard/classes/${chosenDeck?.class_info?.id}`)}>
                        <img src={chosenDeck?.class_info?.image} alt="class" />
                        <p>{chosenDeck?.class_info?.name}</p>
                    </div>
                </div>
                <div id="study-page-side-bar-bottom">
                    <p>Cards left:</p>
                    <div id="study-flashcards-progress-bar">
                        {chosenDeck?.flashcards?.length && chosenDeck?.flashcards.map((flashcard, idx) => (
                            <div key={idx}>
                                {idx === cardNumber ?
                                    revealed ?
                                        <i className="fa-solid fa-circle-check fa-xl checked current" />
                                        :
                                        <i className="fa-regular fa-circle fa-xl current" />
                                    :
                                    idx < cardNumber ?
                                        <i className="fa-solid fa-circle-check fa-xl checked" />
                                        :
                                        <i className="fa-regular fa-circle fa-xl" />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div id="study-sidebar-space"></div>
            <div id="study-page">
                <div id="study-page-deck-info-container">
                    <div id="study-page-deck-info-left">
                        <div id="study-page-deck-name">
                            Deck: <span className="deck-info-span">{chosenDeck?.name}</span>
                        </div>
                        <div id="study-page-deck-flashcard-num">
                            Card: <span className="deck-info-span">{cardNumber + 1}</span> / <span className="deck-info-span">{chosenDeck?.flashcards?.length}</span>
                        </div>
                    </div>
                    <div id="study-page-deck-info-right">
                        <OpenModalButton
                            modalComponent={<PreviewFlashcardsModal props={[chosenDeck]} />}
                            buttonText="SEE ALL CARDS IN THIS DECK"
                        />
                    </div>
                </div>
                <div id="study-page-flashcard-container">
                    <div id="study-flashcard-top"></div>
                    <div id="study-flashcard-question-container" className={!revealed ? "solo" : ""}>
                        <p className="study-flashcard-letter">Q</p>
                        <div className="study-flashcard-prompt">
                            <div className="study-flashcard-text">{currentCard?.question}</div>
                            {currentCard?.question_image &&
                                <img className="study-flashcard-image" src={currentCard?.question_image} alt="question" />
                            }
                        </div>
                    </div>
                    {revealed &&
                        <div id="study-flashcard-answer-container">
                            <p className="study-flashcard-letter">A</p>
                            <div className="study-flashcard-prompt">
                                <div className="study-flashcard-text">{currentCard?.answer}</div>
                                {currentCard?.answer_image &&
                                    <img className="study-flashcard-image" src={currentCard?.answer_image} alt="answer" />
                                }
                            </div>
                        </div>
                    }
                </div>
                {revealed ?
                    chosenDeck?.flashcards?.length > cardNumber + 1 ?
                        <div id="study-next-button" onClick={() => {
                            setCardNumber(cardNumber + 1)
                            setRevealed(false)
                        }}>
                            NEXT QUESTION
                        </div>
                        :
                        <div id="study-finished-button-container">
                            <div id="study-again-button" onClick={() => {
                                setRevealed(false)
                                setCardNumber(0)
                            }}>
                                STUDY AGAIN
                            </div>
                            <div id="study-return-button" onClick={() => history.push(`/dashboard/classes/${chosenDeck?.class_info?.id}`)}>
                                RETURN TO DASHBOARD
                            </div>
                        </div>
                    :
                    <div id="study-reveal-button" onClick={() => handleReveal()}>
                        REVEAL ANSWER
                    </div>
                }
            </div>
        </div>
    )
}

export default StudyPage
