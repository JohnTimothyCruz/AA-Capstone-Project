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
        dispatch(getClass(params?.id))
    }, [dispatch])

    const checkUser = () => {
        let enrolled = true
        for (const user of chosenClass?.learners) {
            if (user?.user_id === session?.user?.id) enrolled = false
        }
        return enrolled
    }

    const handleEnroll = () => {
        if (checkUser()) {
            dispatch(postLearner(chosenClass?.id, session?.user?.id))
                .then(history.push(`/dashboard/classes/${chosenClass?.id}`))
        }
        history.push(`/dashboard/classes/${chosenClass?.id}`)
    }

    return (
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
        </div>
    )
}

export default ClassEnrollPage
