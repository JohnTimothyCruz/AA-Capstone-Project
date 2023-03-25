import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getClasses } from "../../store/classes";
import { getUser } from "../../store/session";
import "./LoadingClasses.css"

const LoadingClasses = () => {
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
        for (const c of Object.values(userRelatedClasses)) {
            if (c) {
                history.push(`/dashboard/classes/${c.id}`)
            }
        }
        return null
    }

    const userRelatedClasses = getUserRelatedClasses()

    useEffect(() => {
        dispatch(getClasses())
        dispatch(getUser(session?.user?.id))
        const res = findAnotherClass()
        if (!res) history.push("/dashboard")
    }, [dispatch])

    findAnotherClass()

    return (
        <div className="dashboard-container">
            <div className="dashboard-side-bar">
            <div className="dashboard-side-bar-top">
                    <div className="user-icon-container">
                        <i onClick={() => history.push("/")} className="dashboard-logo-icon fa-solid fa-robot fa-2xl" />
                        <i className="fa-regular fa-circle-user fa-2xl" />
                        <i className="fa-solid fa-gear fa-2xl" />
                    </div>
                </div>
            </div>
            {/* <div id="loading-message">
                Loading...
            </div> */}
        </div>
    )
}

export default LoadingClasses
