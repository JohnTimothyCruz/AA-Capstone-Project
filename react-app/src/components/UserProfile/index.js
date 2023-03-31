import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getClasses } from "../../store/classes";
import "./UserProfile.css"
import { getOtherUser } from "../../store/session";

const UserProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const session = useSelector(state => state.session)
    const allClasses = useSelector(state => state?.classes?.allClasses)

    useEffect(() => {
        dispatch(getClasses())
        dispatch(getOtherUser(params?.id))
    }, [dispatch])

    const getCardNumber = (a_class) => {
        let num = 0
        if (a_class?.decks?.length) {
            for (const deck of a_class?.decks) {
                num += deck?.flashcards?.length
            }
        }
        return num
    }

    const getUserMadeClasses = () => {
        const arr = []
        for (const a_class of session?.otherUser?.classes) {
            arr.push(allClasses[a_class?.id])
        }
        return arr
    }
    const classes = session?.otherUser && getUserMadeClasses()

    const getUserEnrolledClasses = () => {
        const arr = []
        for (const a_class of session?.otherUser?.learning) {
            if (session?.otherUser?.id !== allClasses[a_class?.class_id]?.user_id) {
                arr.push(allClasses[a_class?.class_id])
            }
        }
        return arr
    }
    const learning = session?.otherUser && getUserEnrolledClasses()

    return (
        <div id="user-profile-page">
            <div id="user-profile-banner">
                <h1 id="user-profile-username">{session?.otherUser?.username}</h1>
            </div>
            <div id="user-profile-created-classes-container">
                <h2 className="user-profile-classes-number">Classes Created ({session?.otherUser?.classes?.length})</h2>
                <div className="user-profile-enrolled-classes">
                    {classes && classes.map((a_class, idx) => (
                        <div
                            className="user-profile-class-container"
                            key={idx}
                            onClick={() => history.push(`/dashboard/classes/${a_class?.id}`)}
                        >
                            <img className="user-profile-class-image" src={a_class?.image} alt="class" />
                            <div className="user-profile-class-info">
                                <p className="user-profile-class-name">{a_class?.name}</p>
                                <p className="user-profile-class-stats">{a_class?.decks?.length} decks {getCardNumber(a_class)} cards</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div id="user-profile-enrolled-classes-container">
                <h2 className="user-profile-classes-number">Classes Studying ({learning?.length})</h2>
                <div className="user-profile-enrolled-classes">
                    {learning && learning.map((a_class, idx) => (
                        <div
                            className="user-profile-class-container"
                            key={idx}
                            onClick={() => history.push(`/dashboard/classes/${a_class?.id}`)}
                        >
                            <img className="user-profile-class-image" src={a_class?.image} alt="class" />
                            <div className="user-profile-class-info">
                                <p className="user-profile-class-name">{a_class?.name}</p>
                                <p className="user-profile-class-stats">{a_class?.decks?.length} decks {getCardNumber(a_class)} cards</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
