import React, { useState, useEffect, useRef } from "react";
import "./SingleLearner.css"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteLearner } from "../../store/classes";

const SingleLearner = ({ props }) => {
    const history = useHistory();
    const ulRef = useRef();
    const dispatch = useDispatch();
    const [learner, getCardNumber, chosenClass, session] = props;
    const [showMenu, setShowMenu] = useState(false);

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

    const handleRemoval = () => {
        dispatch(deleteLearner(chosenClass?.id, learner?.id, session?.user?.id))
    }

    return (
        <div className="learner-container">
            <i className="learner-circle fa-regular fa-circle fa-lg" />
            <i className="learner-icon fa-regular fa-circle-user fa-xl" />
            <div className="learner-left">
                <p className="learner-username">{learner?.user?.username}</p>
            </div>
            <div className="learner-details">
                <p className="learner-detail">{(learner?.studied_cards?.length / getCardNumber()).toFixed(1) * 100}<span className="learner-percent-symbol">%</span></p>
                <p className="learner-detail">{learner?.days_studied}</p>
                <p className="learner-detail">{learner?.time_studied} <span className="learner-time-min">min</span></p>
                <div className="cards-studied-num-container">
                    <p className="learner-detail">{learner?.cards_studied}</p>
                    <p className="learner-detail">{learner?.studied_cards?.length}</p>
                </div>
            </div>
            <div className="learner-options">
                <i className="fa-solid fa-ellipsis fa-xl" onClick={() => setShowMenu(true)} />
                <div className="learner-options-wrapper">
                    <div className={`learner-options-container ${showMenu ? "" : "hidden"}`}>
                        <div className="learner-option" onClick={() => history.push(`/profiles/${learner?.id}`)}>
                            <i className="fa-solid fa-user" />
                            <p>Show Learner's Profile</p>
                        </div>
                        {chosenClass?.user_id === session?.user?.id &&
                            <div className="learner-option" onClick={() => handleRemoval()}>
                                <i className="fa-solid fa-xmark" />
                                <p>Remove From Class</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleLearner
