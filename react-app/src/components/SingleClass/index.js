import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getClasses } from "../../store/classes";
import ClassInfo from "../ClassInfo";
import ClassLearners from "../ClassLearners";
import ClassAbout from "../ClassAbout";
import ClassDecks from "../ClassDecks";
import Sidebar from "../Sidebar";
import "./SingleClass.css"

const SingleClass = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const [menu, setMenu] = useState("decks")

    const session = useSelector(state => state.session)
    const classes = useSelector(state => state.classes)
    const chosenClass = classes.allClasses[params.classId]

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

    if (!classes.allClasses[params.classId]?.id) history.push("/dashboard/loading")

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div id="dashboard-classes-container">
                <ClassInfo props={[session, chosenClass, getUserRelatedClasses]} />
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
