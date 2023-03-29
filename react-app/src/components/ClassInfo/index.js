import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { simplePutClass } from "../../store/classes";
import "./ClassInfo.css"
import ClassImageModal from "../ClassImageModal";
import DeleteClassModal from "../DeleteClassModal";

const ClassInfo = ({ props }) => {
    const dispatch = useDispatch()
    const [session, chosenClass, getUserRelatedClasses] = props;
    const [editing, setEditing] = useState(false)
    const [classTitle, setClassTitle] = useState(chosenClass?.name)
    const [openDeleteMenu, setOpenDeleteMenu] = useState(false)
    const ulRef = useRef();

    useEffect(() => {
        setEditing(false)
        setClassTitle(chosenClass?.name)
    }, [chosenClass])

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

    const handleEditTitleSubmit = (e) => {
        e.preventDefault()

        dispatch(simplePutClass(classTitle, chosenClass?.id, session?.user?.id))
            .then(setEditing(false))
    }

    return (
        <div id="dashboard-class-info-container">
            <div id="dashboard-class-info-left-container">
                <div id="dashboard-class-image-container">
                    <img id="dashboard-class-image" src={chosenClass?.image} alt="class" />
                    <OpenModalButton
                        buttonText={
                            <>
                                <i className="fa-solid fa-pencil" />
                                <p>Choose icon</p>
                            </>
                        }
                        modalComponent={<ClassImageModal props={[chosenClass, session?.user?.id]} />}
                    />
                </div>
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
                                    <OpenModalButton
                                        modalComponent={<DeleteClassModal props={[chosenClass, session, getUserRelatedClasses, "delete"]} />}
                                        buttonText={
                                            <div className="class-button class-options-pop-up-section">
                                                <i className="class-button-icon fa-regular fa-trash-can" />
                                                <p className="class-button-text">Delete this Class</p>
                                            </div>
                                        }
                                    />
                                    :
                                    <OpenModalButton
                                        modalComponent={<DeleteClassModal props={[chosenClass, session, getUserRelatedClasses, "remove"]} />}
                                        buttonText={
                                            <div className="class-button class-options-pop-up-section">
                                                <i className="class-button-icon fa-solid fa-xmark" />
                                                <p className="class-button-text">Remove from your Classes</p>
                                            </div>
                                        }
                                    />
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
