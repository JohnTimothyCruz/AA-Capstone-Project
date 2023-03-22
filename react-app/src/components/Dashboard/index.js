import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const [menu, setMenu] = useState("decks")

    const store = useSelector(state => state)

    useEffect(() => {
        dispatch(getClasses())
    }, [dispatch])

    return (
        <div id="dashboard-container">
            <div id="dashboard-side-bar">

            </div>
            <div id="dashboard-class-container">
                <div id="dashboard-class-info">

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
            </div>
        </div>
    )
}

export default Dashboard
