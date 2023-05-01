import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getClass } from "../../store/classes"
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal"
import { postLearner } from "../../store/classes";
import "./ClassEnrollPage.css"

const ClassEnrollPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()

    const session = useSelector(state => state.session)
    const chosenClass = useSelector(state => state.classes.singleClass)

    useEffect(() => {
        dispatch(getClass(params.classId))
        window.scrollTo(0, 0)
    }, [dispatch])

    const checkUser = () => {
        let enrolled = true
        for (const user of chosenClass?.learners) {
            if (user?.user_id === session?.user?.id) enrolled = false
        }
        return enrolled
    }

    const getCardNumber = (a_class) => {
        let num = 0
        if (a_class?.decks) {
            for (const deck of a_class.decks) {
                num += deck?.flashcards?.length
            }
        }
        return num
    }

    const handleEnroll = () => {
        if (checkUser()) {
            dispatch(postLearner(chosenClass?.id, session?.user?.id))
                .then(history.push(`/dashboard/classes/${chosenClass?.id}`))
        }
        history.push(`/dashboard/classes/${chosenClass?.id}`)
    }

    return (
        chosenClass?.description ?
            <div id="class-enroll-page">
                <div id="enroll-class-prompt-container">
                    <img id="enroll-class-image" src={chosenClass?.image} alt="class" />
                    <div id="enroll-class-prompt">
                        <h1 id="enroll-class-name">{chosenClass?.name}</h1>
                        <p id="enroll-class-credit">This class was created by BrainBash user {chosenClass?.user?.username}. Visit their profile to learn more about the creator.</p>
                        <p id="enroll-class-creator">
                            Flashcard Maker:
                            <span id="enroll-class-creator-name">
                                {" " + chosenClass?.user?.username}
                            </span>
                        </p>
                        {session?.user ?
                            <div
                                id="enroll-class-button"
                                onClick={() => handleEnroll()}
                            >Start Studying</div>
                            :
                            <div id="enroll-class-button-logged-out">
                                <OpenModalButton
                                    modalComponent={<SignupFormModal />}
                                    buttonText="Start Studying"
                                />
                            </div>
                        }
                    </div>
                </div>
                <div id="enroll-class-stats">
                    <div className="enroll-class-stat">
                        <i className="fa-solid fa-layer-group fa-2xl" />
                        {chosenClass?.decks?.length || 0} decks
                    </div>
                    <div className="enroll-class-stat">
                        <i className="fa-regular fa-rectangle-list fa-2xl" />
                        {chosenClass && getCardNumber(chosenClass)} flashcards
                    </div>
                    <div className="enroll-class-stat">
                        <i className="fa-solid fa-users fa-2xl" />
                        {chosenClass?.learners?.length || 0} learners
                    </div>
                </div>
                <div id="enroll-class-decks">
                    <h2>Decks in this class ({chosenClass?.decks?.length || 0})</h2>
                    <div id="enroll-class-decks-container">
                        {chosenClass?.decks?.length ? chosenClass?.decks?.map((deck, idx) => (
                            <div className="enroll-class-deck" key={idx}>
                                <img className="enroll-class-deck-left" src={chosenClass?.image} />
                                <div className="enroll-class-deck-middle-left">
                                    <h3>{deck?.name}</h3>
                                    <p>{deck?.description || "No deck description has yet been added by the author."}</p>
                                </div>
                                <p className="enroll-class-deck-middle-right">{deck?.flashcards?.length || 0} cards</p>
                            </div>
                        ))
                            :
                            <div id="enroll-class-no-decks">
                                <i className="fa-regular fa-face-grin-beam-sweat" />
                                Sorry, looks like this class is a bit empty at the moment...
                            </div>
                        }
                    </div>
                </div>
            </div>
            :
            <div id="empty-class-enroll-page">
                <p id="empty-enroll-page-message">
                    Sorry, looks like this class no longer exists...
                </p>
                <div id="empty-enroll-page-home-button" onClick={() => history.push("/")}>
                    Return Home
                </div>
            </div>
    )
}

export default ClassEnrollPage
