import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { useHistory, useParams } from "react-router-dom";
import { getClasses } from "../../store/classes";
import CreateClassModal from "../CreateClassModal";
import ClassInfo from "../ClassInfo";
import ClassLearners from "../ClassLearners";
import ClassAbout from "../ClassAbout";
import ClassDecks from "../ClassDecks";
import "./SingleClass.css"

const SingleClass = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const [menu, setMenu] = useState("decks")

    const session = useSelector(state => state.session)
    const classes = useSelector(state => state.classes)
    const chosenClass = classes.allClasses[params.id]

    useEffect(() => {
        dispatch(getClasses())
    }, [dispatch])

    const getUserRelatedClasses = () => {
        const userClasses = session?.user?.classes
        const res = []
        if (userClasses) {
            for (const c of userClasses) {
                res.push(classes.allClasses[c.id])
            }
        }

        const joinedClasses = session?.user?.learning
        if (joinedClasses) {
            for (const c of Object.values(joinedClasses)) {
                if (classes?.allClasses[c.class_id]?.user_id !== session?.user?.id) {
                    res.push(classes?.allClasses[c.class_id])
                }
            }
        }

        return res
    }

    const userRelatedClasses = getUserRelatedClasses()

    const swapClass = (c) => {
        history.push(`/dashboard/classes/${c?.id}`)
    }

    if (!classes.allClasses[params.id]?.id) history.push("/dashboard/loading")

    return (
        <div className="dashboard-container">
            <div className="side-bar-space"></div>
            <div className="dashboard-side-bar">
                <div className="dashboard-side-bar-top">
                    <div className="user-icon-container">
                        <i onClick={() => history.push("/")} className="dashboard-logo-icon fa-solid fa-robot fa-2xl" />
                        <i className="fa-regular fa-circle-user fa-2xl" />
                        <i className="fa-solid fa-gear fa-2xl" />
                    </div>
                    <div id="user-classes-list">
                        {userRelatedClasses && userRelatedClasses.map((c, idx) => (
                            <div className={`class-image-container ${chosenClass?.id === c?.id && "selected"}`} onClick={() => swapClass(c)} key={`made ${idx}`}>
                                <img className="dashboard-class" src={c?.image} alt="class" ></img>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="dashboard-side-bar-bottom">
                    <OpenModalButton
                        modalComponent={<CreateClassModal props={[session?.user?.id]} />}
                        buttonText={<i className="fa-solid fa-circle-plus fa-xl" />}
                    />
                </div>
            </div>
            <div id="dashboard-classes-container">
                <ClassInfo props={[session, chosenClass, userRelatedClasses]} />
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
                    <ClassAbout props={[session, chosenClass]} />
                </div>
                <div id="dashboard-class-decks" className={`dashboard-menu-option-display ${menu === "decks" ? "" : "hidden"}`}>
                    <ClassDecks props={[session, chosenClass]} />
                </div>
                <div id="dashboard-class-learners" className={`dashboard-menu-option-display ${menu === "learners" ? "" : "hidden"}`}>
                    <ClassLearners props={[session, chosenClass]} />
                </div>
            </div>
        </div>
    )
}

export default SingleClass
