import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./ClassAbout.css";
import { descriptionPutClass, getClasses, headlinePutClass, mixPutClass, visibilityPutClass } from "../../store/classes";

const ClassAbout = ({ props }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [session, chosenClass] = props;
    const [preview, setPreview] = useState(false)
    const [headline, setHeadline] = useState(chosenClass?.headline);
    const [description, setDescription] = useState(chosenClass?.description);
    const [mixType, setMixType] = useState(chosenClass?.mix_type);
    const [visibility, setVisibility] = useState(chosenClass?.visibility);
    const [editing, setEditing] = useState(false)
    const [warn, setWarn] = useState(false)

    useEffect(() => {
        dispatch(getClasses())
    }, [dispatch, preview])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editing === "Headline") {
            if (headline.length > 280) {
                setWarn(true)
            } else {
                dispatch(headlinePutClass(headline, chosenClass?.id, session?.user?.id))
                    .then(setEditing(false))
            }
        } else if (editing === "Description") {
            if (description.length > 5000) {
                setWarn(true)
            } else {
                dispatch(descriptionPutClass(description, chosenClass?.id, session?.user?.id))
                    .then(setEditing(false))
            }
        }
    }

    const handleMixRadios = (type) => {
        if (type !== mixType) {
            dispatch(mixPutClass(type, chosenClass?.id, session?.user?.id))
                .then(setMixType(type))
        }
    }

    const handleVisibilityRadios = (type) => {
        if (type !== visibility) {
            dispatch(visibilityPutClass(type, chosenClass?.id, session?.user?.id))
                .then(setVisibility(type))
        }
    }

    return (
        (session?.user?.id === chosenClass?.user_id) && preview === false ?
            <div id="about-page-container">
                <div id="about-page-forms-container" className={editing ? "active" : ""}>
                    <div id="about-preview-container" className={editing ? "hidden" : ""}>
                        {session?.user?.id === chosenClass?.user_id &&
                            <p
                                id="about-preview-button"
                                onClick={() => setPreview(true)}
                            >Preview</p>
                        }
                    </div>
                    <div id="editing-what" className={editing ? "" : "hidden"}>
                        {`Editing ${editing}`}
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className="about-page-form">
                        <div id="about-headline-input-container" className={`about-input-prompt-container ${editing === "Headline" ? "no-underline" : ""}`}>
                            <div className="about-input-prompt-left">
                                <p className="about-input-prompt">Headline</p>
                                <i className={`fa-solid fa-pencil about-form-edit-button ${editing ? "hidden" : ""}`} onClick={() => setEditing("Headline")} />
                            </div>
                            <div className={`about-input-prompt-right ${editing === "Headline" ? "" : "hidden"}`}>
                                <p className="about-form-cancel-button" onClick={() => {
                                    setEditing(false)
                                    setHeadline(chosenClass?.headline)
                                }} >Cancel</p>
                                <div className="about-form-line"></div>
                                <button className="about-form-save-button">SAVE CHANGES</button>
                            </div>
                        </div>
                        <div className={`about-form-text ${editing === "Headline" ? "hidden" : ""}`}>
                            {chosenClass?.headline ? chosenClass?.headline : "No headline. Click the Edit button to add a headline."}
                        </div>
                        <textarea
                            id="about-headline-form"
                            className={editing === "Headline" ? headline?.length > 280 ? warn ? "over warn" : "over" : "" : "hidden"}
                            placeholder="Enter a short summary of your class"
                            value={headline || ""}
                            onChange={(e) => {
                                setHeadline(e.target.value)
                                setWarn(false)
                            }}
                        />
                        <div className={`about-form-chars-container ${editing === "Headline" ? headline?.length > 280 ? "over" : "" : "hidden"}`}>
                            {!headline || headline?.length <= 280 ?
                                <p>{headline?.length || 0} of 280 char</p>
                                :
                                <p>Your headline exceeds the character limit <span>({headline?.length || 0} of 280 char)</span></p>}
                        </div>
                    </form>
                    <form onSubmit={(e) => handleSubmit(e)} className="about-page-form">
                        <div id="about-description-input-container" className={`about-input-prompt-container ${editing === "Description" ? "no-underline" : ""}`}>
                            <div className="about-input-prompt-left">
                                <p className="about-input-prompt">Description</p>
                                <i className={`fa-solid fa-pencil about-form-edit-button ${editing ? "hidden" : ""}`} onClick={() => setEditing("Description")} />
                            </div>
                            <div className={`about-input-prompt-right ${editing === "Description" ? "" : "hidden"}`}>
                                <p className="about-form-cancel-button" onClick={() => {
                                    setEditing(false)
                                    setDescription(chosenClass?.description)
                                }}>Cancel</p>
                                <div className="about-form-line"></div>
                                <button className="about-form-save-button">SAVE CHANGES</button>
                            </div>
                        </div>
                        <div className={`about-form-text ${editing === "Description" ? "hidden" : ""}`}>
                            {chosenClass?.description ? chosenClass?.description : "No description. Click the Edit button to add a description."}
                        </div>
                        <textarea
                            id="about-description-form"
                            className={editing === "Description" ? description?.length > 5000 ? warn ? "over warn" : "over" : "" : "hidden"}
                            placeholder="Enter a detailed description for your class."
                            value={description || ""}
                            onChange={(e) => {
                                setDescription(e.target.value)
                                setWarn(false)
                            }}
                        />
                        <div className={`about-form-chars-container ${editing === "Description" ? "" : "hidden"}`}>
                            {!description || description?.length <= 5000 ?
                                <p>{description?.length || 0} of 5000 char</p>
                                :
                                <p>Your description exceeds the character limit <span>({description?.length || 0} of 5000 char)</span></p>}
                        </div>
                    </form>
                    <div id="about-settings-container">
                        <div className={`about-input-prompt-container ${editing === "Description" ? "no-underline" : ""}`}>
                            <div className="about-input-prompt-left">
                                <p className="about-input-prompt">Settings</p>
                            </div>
                        </div>
                        <div id="about-settings-options">
                            <div className="about-settings-options-section">
                                <p className="radio-section-prompt">Default Study Mix Type</p>
                                <div className="radio-section-radios">
                                    <div className="radio-label-container">
                                        <input
                                            type="radio"
                                            id="progressive"
                                            name="mix-type"
                                            checked={mixType === "progressive"}
                                            onChange={() => handleMixRadios("progressive")}
                                        />
                                        <label htmlFor="progressive">Progressive</label>
                                    </div>
                                    <div className="radio-label-container">
                                        <input
                                            type="radio"
                                            id="random"
                                            name="mix-type"
                                            checked={mixType === "random"}
                                            onChange={() => handleMixRadios("random")}
                                        />
                                        <label htmlFor="random">Random</label>
                                    </div>
                                </div>
                            </div>
                            <div className="about-settings-options-section">
                                <p className="radio-section-prompt">Class Visibility</p>
                                <div className="radio-section-radios">
                                    <div className="radio-label-container">
                                        <input
                                            type="radio"
                                            id="public"
                                            name="visibility"
                                            checked={visibility === "public"}
                                            onChange={() => handleVisibilityRadios("public")}
                                        />
                                        <label htmlFor="public">Public</label>
                                    </div>
                                    <div className="radio-label-container">
                                        <input
                                            type="radio"
                                            id="private"
                                            name="visibility"
                                            checked={visibility === "private"}
                                            onChange={() => handleVisibilityRadios("private")}
                                        />
                                        <label htmlFor="private">Private</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div id="about-page-container-preview">
                {session?.user?.id === chosenClass?.user_id &&
                    <i
                        id="about-preview-close-button"
                        className="fa-solid fa-xmark fa-sm"
                        onClick={() => setPreview(!preview)}
                    />
                }
                <p className="about-page-preview-title">Headline</p>
                {chosenClass?.objective ||
                    <p className="about-page-preview-text">
                        <span>
                            This class was created by Brainscape user
                        </span> <span
                            id="class-about-creator"
                            onClick={() => history.push(`/profiles/${chosenClass?.user_id}`)}
                        >{chosenClass?.user?.username}</span>
                        . Visit their profile to learn more about the creator.
                    </p>
                }
                <p className="about-page-preview-title">Description</p>
                {chosenClass?.description ||
                    <p className="about-page-preview-text">
                        No description.
                    </p>
                }
            </div>
    )
}

export default ClassAbout
