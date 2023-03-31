import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getClasses } from "../../store/classes";
import "./UserProfile.css"

const UserProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const session = useSelector(state => state.session)
    const allClasses = useSelector(state => state?.classes?.allClasses)

    useEffect(() => {
        dispatch(getClasses())
    }, [dispatch])

    const getCardNumber = (a_class) => {
        let num = 0
        if (a_class?.decks?.length) {
            for (const deck of a_class?.decks) {
                console.log(deck)
                num += deck?.flashcards?.length
            }
        }
        return num
    }

    const getUserMadeClasses = () => {
        const arr = []
        for (const a_class of session?.user?.classes) {
            arr.push(allClasses[a_class?.id])
        }
        return arr
    }
    const classes = getUserMadeClasses()

    const getUserEnrolledClasses = () => {
        const arr = []
        for (const a_class of session?.user?.learning) {
            if (session?.user?.id === a_class?.user_id && session?.user?.id !== a_class?.user?.id) {
                arr.push(allClasses[a_class?.class_id])
            }
        }
        return arr
    }
    const learning = getUserEnrolledClasses()

    return (
        <div id="user-profile-page">
            <div id="user-profile-banner">
                <h1 id="user-profile-username">{session?.user?.username}</h1>
            </div>
            <div id="user-profile-created-classes-container">
                <h2 className="user-profile-classes-number">Classes Created ({session?.user?.classes?.length})</h2>
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
                    {learning.map((a_class, idx) => (
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
