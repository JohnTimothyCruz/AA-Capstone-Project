import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
import { deleteClass, getClass, getClasses, imagePutClass, putClass, simplePutClass } from "../../store/classes";
import './Dashboard.css'
import CreateClassModal from "../CreateClassModal";
import { getUser } from "../../store/session";

const Dashboard = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [menu, setMenu] = useState("decks")
    const [editing, setEditing] = useState(false)

    const session = useSelector(state => state.session)
    const classes = useSelector(state => state.classes)

    const getUserMadeClasses = () => {
        const userClasses = session?.user?.classes
        const res = []
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
                res.push(classes[c.id])
            }
        }
        return res
    }

    const userMadeClasses = getUserMadeClasses()
    const userJoinedClasses = getUserJoinedClasses()
    const [chosenClass, setChosenClass] = useState(userMadeClasses[0])
    const [classTitle, setClassTitle] = useState(chosenClass?.name)

    useEffect(() => {
        dispatch(getClasses())
    }, [])

    useEffect(() => {
        setChosenClass(userMadeClasses[0])
    }, [classes])

    const handleEditTitleSubmit = (e) => {
        e.preventDefault()

        dispatch(simplePutClass(classTitle, chosenClass?.id, session?.user?.id))
            .then(setEditing(false))
    }

    const handleDelete = () => {
        dispatch(deleteClass(chosenClass))
    }

    if (!chosenClass) {
        dispatch(getUser(session.user.id))
        dispatch(getClasses())
    }

    return (
        <div id="dashboard-container">
            <div id="dashboard-side-bar">
                <div id="dashboard-side-bar-top">
                    <div id="user-icon-container">
                        <i onClick={() => history.push("/")} className="dashboard-logo-icon fa-solid fa-robot fa-2xl" />
                        <i className="fa-regular fa-circle-user fa-2xl" />
                        <i className="fa-solid fa-gear fa-2xl" />
                    </div>
                    <div id="user-made-classes-list">
                        {userMadeClasses && userMadeClasses.map((c, idx) => (
                            <div className={`class-image-container ${chosenClass?.id === c?.id && "selected"}`} onClick={() => setChosenClass(c)} key={idx}>
                                <img className="dashboard-class" src={c?.image} onClick={() => setChosenClass(c)} alt="class"></img>
                            </div>
                        ))}
                        {userJoinedClasses && userJoinedClasses.map((c, idx) => (
                            <div className={`class-image-container ${chosenClass?.id === c?.id && "selected"}`} onClick={() => setChosenClass(c)} key={idx}>
                                <img className="dashboard-class" src={c?.image} alt="class"></img>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="dashboard-side-bar-bottom">
                    <OpenModalButton
                        modalComponent={<CreateClassModal user_id={session?.user?.id} />}
                        buttonText={<i className="fa-solid fa-circle-plus fa-xl" />}
                    />
                </div>
            </div>
            <div id="dashboard-class-container">
                {(session?.user?.classes.length || session?.user?.learning.length) ?
                    <>
                        <div id="dashboard-class-info-container">
                            <div id="dashboard-class-info-left-container">
                                <img id="dashboard-class-image" src={chosenClass?.image} alt="class"></img>
                                <div id="dashboard-class-info">
                                    <div id="dashboard-class-title-section">
                                        {editing ?
                                            <form id="edit-class-title-form" onSubmit={(e) => handleEditTitleSubmit(e)}>
                                                <input
                                                    id="edit-class-title-input"
                                                    placeholder="Enter Class Name"
                                                    onChange={(e) => setClassTitle(e.target.value)}
                                                    value={classTitle || ""}
                                                />
                                                <i id="cancel-edit-title-button" className="fa-solid fa-xmark fa-xl" onClick={() => setEditing(false)} />
                                                <button
                                                    id="submit-edit-title-button"
                                                    disabled={!classTitle}
                                                >SAVE</button>
                                            </form>
                                            :
                                            <>
                                                <h2 id="class-title">{chosenClass?.name}</h2>
                                                {session?.user?.id === chosenClass?.user?.id &&
                                                    <i id="edit-class-button" className="fa-solid fa-pencil fa-lg" onClick={() => setEditing(true)} />
                                                }
                                            </>
                                        }
                                    </div>
                                    <p className="class-info-details">Creator: <span id="class-creator-name">{session?.user?.username}</span></p>
                                    <p className="class-info-details">0 of 2</p>
                                    <div id="class-extra-options-menu">
                                        <div id="class-study-button">
                                            <div>STUDY</div>
                                            <i className="fa-solid fa-circle-play fa-xl" />
                                        </div>
                                        <i tabIndex="-1" id="class-options-button" className="fa-solid fa-ellipsis fa-2xl">
                                            <div id="class-options-pop-up">
                                                <div id="delete-class-button" className="class-options-pop-up-section" onClick={() => handleDelete()}>
                                                    <i id="delete-class-button-icon" className="fa-regular fa-trash-can" />
                                                    <p id="delete-class-button-text">Delete this Class</p>
                                                </div>
                                            </div>
                                        </i>
                                    </div>
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
                    </>
                    :
                    <div id="no-classes-page">
                        <h2 id="no-classes-page-prompt">Add Classes to your Library</h2>
                        <h3 id="no-classes-page-explaination">Your library is empty.</h3>
                        <p>You can create your own class, or browse Brain Bash's catalog of flashcard classes covering thousands of subjects.</p>
                        <div id="dashboard-find-create-button-container">
                            <div id="dashboard-find-flashcards-button">FIND FLASHCARDS</div>
                            <OpenModalButton
                                buttonText="CREATE A NEW CLASS"
                                modalComponent={<CreateClassModal user_id={session?.user?.id} />}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dashboard
