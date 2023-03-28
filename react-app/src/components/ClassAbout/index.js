import { useDispatch } from "react-redux";
import { useState } from "react";
import "./ClassAbout.css";
import { descriptionPutClass, headlinePutClass, mixPutClass, visibilityPutClass } from "../../store/classes";

const ClassAbout = ({ props }) => {
    const dispatch = useDispatch()

    const [session, chosenClass] = props;
    const [headline, setHeadline] = useState(chosenClass?.headline);
    const [description, setDescription] = useState(chosenClass?.description);
    const [visibility, setVisibility] = useState(chosenClass?.visibility);
    const [mixType, setMixType] = useState(chosenClass?.mix_type);
    const [editing, setEditing] = useState(false)
    const [warn, setWarn] = useState(false)

    // const scrollToE = (id) => {
    //     const topOfEl = document.getElementById(id).offsetTop;
    //     document.getElementById("about-page-forms-container").scrollTop = topOfEl-10;
    // }

    // function scrollToE() {
    //     var topPos = document.getElementById('about-description-input-container').offsetTop;
    //     document.getElementById('about-page-forms-container').scrollTop = topPos - 10;
    // }

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
        <div id="about-page-container">
            {/* <div id="about-side-panel">
                <a
                    href="#about-headline-input-container"
                    className={`about-panel-section ${menu === "Headline" ? "selected" : ""}`}
                    onClick={() => {
                        setMenu("Headline")
                        scrollToE("about-headline-input-container")
                    }}
                >
                    Headline
                </a>
                <a
                    href="#about-description-input-container"
                    className={`about-panel-section ${menu === "Description" ? "selected" : ""}`}
                    onClick={() => {
                        setMenu("Description")
                        scrollToE("about-description-input-container")
                    }}
                >
                    Description
                </a>
                <a
                    href="#about-settings-options"
                    className={`about-panel-section ${menu === "settings" ? "selected" : ""}`}
                    onClick={() => {
                        setMenu("settings")
                        scrollToE("about-settings-container")
                    }}
                >
                    Settings
                </a>
            </div> */}
            <div id="about-page-forms-container" className={editing ? "active" : ""}>
                <div id="about-preview-container" className={editing ? "hidden" : ""}>
                    <i id="about-preview-close-button" className="fa-solid fa-xmark fa-sm" />
                    <p id="about-preview-button">Preview</p>
                </div>
                <div id="editing-what" className={editing ? "" : "hidden"}>
                    {`Editing ${editing}`}
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className="about-page-form">
                    <div id="about-headline-input-container" className={`about-input-prompt-container ${editing === "Headline" ? "no-underline" : ""}`}>
                        <div className="about-input-prompt-left">
                            <p className="about-input-prompt">Headline</p>
                            {/* <i className="fa-solid fa-circle-info about-form-info" /> */}
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
                    <p className={`about-form-chars-container ${editing === "Headline" ? headline?.length > 280 ? "over" : "" : "hidden"}`}>
                        {!headline || headline?.length <= 280 ?
                            <p>{headline?.length || 0} of 280 char</p>
                            :
                            <p>Your headline exceeds the character limit <span>({headline?.length || 0} of 280 char)</span></p>}
                    </p>
                </form>
                <form onSubmit={(e) => handleSubmit(e)} className="about-page-form">
                    <div id="about-description-input-container" className={`about-input-prompt-container ${editing === "Description" ? "no-underline" : ""}`}>
                        <div className="about-input-prompt-left">
                            <p className="about-input-prompt">Description</p>
                            {/* <i className="fa-solid fa-circle-info about-form-info" /> */}
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
                    <p className={`about-form-chars-container ${editing === "Description" ? "" : "hidden"}`}>
                        {!description || description?.length <= 5000 ?
                            <p>{description?.length || 0} of 5000 char</p>
                            :
                            <p>Your description exceeds the character limit <span>({description?.length || 0} of 5000 char)</span></p>}
                    </p>
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
    )
}

export default ClassAbout
