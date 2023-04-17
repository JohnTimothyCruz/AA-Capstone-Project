import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
import { getClasses } from "../../store/classes";
import './Dashboard.css'
import CreateClassModal from "../CreateClassModal";
import { getUser } from "../../store/session";
import Sidebar from "../Sidebar";

const Dashboard = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const session = useSelector(state => state.session)
    const classes = useSelector(state => state.classes)

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

    const findAnotherClass = () => {
        for (const c of Object.values(getUserRelatedClasses())) {
            if (c) {
                history.push(`/dashboard/classes/${c.id}`)
            }
        }
    }

    useEffect(() => {
        dispatch(getClasses())
        dispatch(getUser(session?.user?.id))
        findAnotherClass()
    }, [dispatch])

    findAnotherClass()

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div id="dashboard-no-classes-container">
                <div id="no-classes-page">
                    <h2 id="no-classes-page-prompt">Add Classes to your Library</h2>
                    <h3 id="no-classes-page-explaination">Your library is empty.</h3>
                    <p>You can create your own class, or browse Brain Bash's catalog of flashcard classes covering thousands of subjects.</p>
                    <div id="dashboard-find-create-button-container">
                        <div id="dashboard-find-flashcards-button" onClick={() => history.push("/classes")}>FIND FLASHCARDS</div>
                        <OpenModalButton
                            buttonText="CREATE A NEW CLASS"
                            modalComponent={<CreateClassModal props={[session?.user?.id]} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
