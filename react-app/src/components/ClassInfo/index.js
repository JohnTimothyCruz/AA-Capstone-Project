import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteClass, deleteLearner, getClasses, simplePutClass } from "../../store/classes";
import "./ClassInfo.css"

const ClassInfo = ({ props }) => {
    const dispatch = useDispatch()
    const [session, chosenClass, swapClass] = props;
    const [editing, setEditing] = useState(false)
    const [classTitle, setClassTitle] = useState(chosenClass?.name)
    const [openDeleteMenu, setOpenDeleteMenu] = useState(false)
    const ulRef = useRef();

    useEffect(() => {
        setEditing(false)
        setClassTitle(chosenClass?.name)
    }, [chosenClass])

    const getLearnerId = () => {
        if (chosenClass) {
            for (const l of Object.values(chosenClass?.learners)) {
                if (l.user_id === session.user.id) {
                    return l.id
                }
            }
        }
    }

    useEffect(() => {
        if (!openDeleteMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current?.contains(e.target)) {
                setOpenDeleteMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [openDeleteMenu]);

    const handleDelete = () => {
        dispatch(deleteClass(chosenClass))
    }

    const handleRemove = () => {
        dispatch(deleteLearner(getLearnerId(), chosenClass.id, session.user.id))
    }

    const handleEditTitleSubmit = (e) => {
        e.preventDefault()

        dispatch(simplePutClass(classTitle, chosenClass?.id, session?.user?.id))
            .then(setEditing(false))
    }

    return (
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
                    <p className="class-info-details">Creator: <span id="class-creator-name">{chosenClass?.user?.username}</span></p>
                    <p className="class-info-details">0 of 2</p>
                    <div id="class-extra-options-menu">
                        <div id="class-study-button">
                            <div>STUDY</div>
                            <i className="fa-solid fa-circle-play fa-xl" />
                        </div>
                        <i id="class-options-button" className="fa-solid fa-ellipsis fa-2xl" onClick={() => setOpenDeleteMenu(true)}>
                            <div id="class-options-pop-up" className={openDeleteMenu ? "" : "hidden"}>
                                {session?.user?.id === chosenClass?.user?.id ?
                                    <div className="class-button class-options-pop-up-section" onClick={() => handleDelete()}>
                                        <i className="class-button-icon fa-regular fa-trash-can" />
                                        <p className="class-button-text">Delete this Class</p>
                                    </div>
                                    :
                                    <div className="class-button class-options-pop-up-section" onClick={() => handleRemove()}>
                                        <i className="class-button-icon fa-solid fa-xmark" />
                                        <p className="class-button-text">Remove from your Classes</p>
                                    </div>
                                }
                            </div>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassInfo
