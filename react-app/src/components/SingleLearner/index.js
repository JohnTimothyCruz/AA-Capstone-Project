import React, { useState, useEffect, useRef } from "react";
import "./SingleLearner.css"
import { useHistory } from "react-router-dom";

const SingleLearner = ({ props }) => {
    const [learner, getCardNumber] = props;
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();
    const ulRef = useRef();

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current?.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className="learner-container">
            <i className="learner-circle fa-regular fa-circle fa-lg" />
            <i className="learner-icon fa-regular fa-circle-user fa-xl" />
            <div className="learner-left">
                <p className="learner-username">{learner?.user?.username}</p>
                <div className="learner-progress-bar"></div>
            </div>
            <div className="learner-details">
                <p className="learner-detail">{(learner?.cards_studied / getCardNumber()).toFixed(1)}<span className="learner-percent-symbol">%</span></p>
                <p className="learner-detail">{learner?.days_studied}</p>
                <p className="learner-detail">{learner?.time_studied} <span className="learner-time-min">min</span></p>
                <div className="cards-studied-num-container">
                    <p className="learner-detail">{learner?.cards_studied}</p>
                    <p className="learner-detail">{learner?.cards_studied}</p>
                </div>
                <p className="learner-detail">{learner?.permission}</p>
            </div>
            <div className="learner-options">
                <i className="fa-solid fa-ellipsis fa-xl" onClick={() => setShowMenu(true)} />
                <div className="learner-options-wrapper">
                    <div className={`learner-options-container ${showMenu ? "" : "hidden"}`}>
                        <div className="learner-option" onClick={() => history.push(`/profiles/${learner?.id}`)}>
                            <i className="fa-solid fa-user" />
                            <p>Show Learner's Profile</p>
                        </div>
                        <div className="learner-option">
                            <i className="fa-solid fa-xmark" />
                            <p>Remove From Class</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleLearner
