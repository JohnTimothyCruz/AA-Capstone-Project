import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getClasses } from "../../store/classes";
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [menu, setMenu] = useState("decks")

    const session = useSelector(state => state.session)
    const classes = useSelector(state => state.classes)

    const getUserMadeClasses = () => {
        const res = []
        const userClasses = session?.user?.classes
        for (const c of userClasses) {
            res.push(classes.allClasses[c.id])
        }
        return res
    }

    const getUserJoinedClasses = () => {
        const res = []
        const joinedClasses = session?.user?.learning
        for (const c of joinedClasses) {
            if (c.user.id !== session.user.id) {
                res.push(classes.allClasses[c.id])
            }
        }
        return res
    }

    const userMadeClasses = getUserMadeClasses()
    const userJoinedClasses = getUserJoinedClasses()
    const [chosenClass, setChosenClass] = useState(session?.user?.classes[0])

    useEffect(() => {
        dispatch(getClasses())
    }, [dispatch])

    useEffect(() => {

    }, [chosenClass])

    return (
        <div id="dashboard-container">
            <div id="dashboard-side-bar">
            <i id="user-icon" className="profile-button fa-regular fa-circle-user fa-2xl" />
                <div id="user-made-classes-list">
                    <>
                        {userMadeClasses && userMadeClasses.map((c, idx) => (
                            <img className="dashboard-class" src={c?.image} onClick={() => setChosenClass(c)} alt="class" key={idx}></img>
                        ))}
                        {userJoinedClasses && userJoinedClasses.map((c, idx) => (
                            <img className="dashboard-class" src={c?.image} onClick={() => setChosenClass(c)} alt="class"></img>
                        ))}
                    </>
                </div>
            </div>
            <div id="dashboard-class-container">
                <div id="dashboard-class-info-container">
                    <div id="dashboard-class-info-left-container">
                        <img id="dashboard-class-image" src={chosenClass?.image} alt="class"></img>
                        <div id="dashboard-class-info">
                            <div id="dashboard-class-title-section">
                                <h2 id="class-title">{chosenClass?.name}</h2>
                                <i className="fa-solid fa-pencil" />
                            </div>
                            <p className="class-info-details">Creator: {session?.user?.username}</p>
                            <p className="class-info-details">0 of</p>
                        </div>
                    </div>
                </div>
                <div id="dashboard-menu">
                    <div id="dashboard-about" className={menu === "about" ? "selected" : ""} onClick={() => setMenu("about")}>
                        <div className="dashboard-menu-section-text">
                            About
                        </div>
                    </div>
                    <div id="dashboard-decks" className={menu === "decks" ? "selected" : ""} onClick={() => setMenu("decks")}>
                        <div className="dashboard-menu-section-text">
                            Decks
                        </div>
                    </div>
                    <div id="dashboard-learners" className={menu === "learners" ? "selected" : ""} onClick={() => setMenu("learners")}>
                        <div className="dashboard-menu-section-text">
                            Learners
                        </div>
                    </div>
                </div>
                <div id="dashboard-class-about" className={`dashboard-menu-option-display ${menu === "about" ? "" : "hidden"}`}>
                    about
                </div>
                <div id="dashboard-class-decks" className={`dashboard-menu-option-display ${menu === "decks" ? "" : "hidden"}`}>
                    <div id="dashboard-decks-container">
                        <div id="dashboard-decks-prompt">
                            <div id="dashboard-decks-prompt-left">
                            <i className="fa-regular fa-circle fa-xl" />
                            <div>Decks</div>
                            </div>
                            <div id="dashboard-decks-prompt-right">
                            <i className="fa-solid fa-circle-plus fa-xl" />
                            </div>
                        </div>
                        {chosenClass?.decks && chosenClass?.decks.map((deck, idx) => (
                            <div className="deck-container" onClick={() => history.push(`/study/decks/${deck?.id}`)} key={idx}>
                                <i className="fa-regular fa-circle fa-xl" />
                                <div className="deck-progress-percent">20%</div>
                                <div className=" deck-info-container">
                                    <div className="deck-name">{deck.name}</div>
                                    <div className="deck-progress-bar"></div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div id="dashboard-class-learners" className={`dashboard-menu-option-display ${menu === "learners" ? "" : "hidden"}`}>
                    learners
                </div>
            </div>
        </div>
    )
}

export default Dashboard
