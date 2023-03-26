import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./ClassAbout.css";
import { descriptionPutClass, headlinePutClass } from "../../store/classes";

const ClassAbout = ({ props }) => {
    const dispatch = useDispatch()

    const [session, chosenClass] = props;
    const [menu, setMenu] = useState("Headline");
    const [headline, setHeadline] = useState(chosenClass?.headline);
    const [description, setDescription] = useState(chosenClass?.description);
    const [visibility, setVisibility] = useState(chosenClass?.visibility);
    const [mixType, setMixType] = useState(chosenClass?.mixType);
    const [editing, setEditing] = useState(false)
    const [warn, setWarn] = useState(false)

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

    return (
        <div id="about-page-container">
            <div id="about-side-panel">
                <div
                    className={`about-panel-section ${menu === "Headline" ? "selected" : ""}`}
                    onClick={() => setMenu("Headline")}
                >
                    Headline
                </div>
                <div
                    className={`about-panel-section ${menu === "Description" ? "selected" : ""}`}
                    onClick={() => setMenu("Description")}
                >
                    Description
                </div>
                <div
                    className={`about-panel-section ${menu === "settings" ? "selected" : ""}`}
                    onClick={() => setMenu("settings")}
                >
                    Settings
                </div>
            </div>
            <div id="about-page-forms-container" className={editing ? "active" : ""}>
                <div id="about-preview-container" className={editing ? "hidden" : ""}>
                    <i id="about-preview-close-button" class="fa-solid fa-xmark fa-sm" />
                    <p id="about-preview-button">Preview</p>
                </div>
                <div id="editing-what" className={editing ? "" : "hidden"}>
                    {`Editing ${editing}`}
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className="about-page-form">
                    <div className={`about-input-prompt-container ${editing === "Headline" ? "no-underline" : ""}`}>
                        <div className="about-input-prompt-left">
                            <p className="about-input-prompt">Headline</p>
                            {/* <i className="fa-solid fa-circle-info about-form-info" /> */}
                            <i className={`fa-solid fa-pencil about-form-edit-button ${editing ? "hidden" : ""}`} onClick={() => setEditing("Headline")} />
                        </div>
                        <div className={`about-input-prompt-right ${editing === "Headline" ? "" : "hidden"}`}>
                            <p className="about-form-cancel-button" onClick={() => setEditing(false)} >Cancel</p>
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
                        value={headline}
                        onChange={(e) => {
                            setHeadline(e.target.value)
                            setWarn(false)
                        }}
                    />
                    <p className={`about-form-chars-container ${editing === "Headline" ? headline?.length > 280 ? "over" : "" : "hidden"}`}>
                        {headline?.length <= 280 ?
                            <p>{headline?.length || 0} of 280 char</p>
                            :
                            <p>Your headline exceeds the character limit <span>({headline?.length || 0} of 280 char)</span></p>}
                    </p>
                </form>
                <form onSubmit={(e) => handleSubmit(e)} className="about-page-form">
                    <div className={`about-input-prompt-container ${editing === "Description" ? "no-underline" : ""}`}>
                        <div className="about-input-prompt-left">
                            <p className="about-input-prompt">Description</p>
                            {/* <i className="fa-solid fa-circle-info about-form-info" /> */}
                            <i className={`fa-solid fa-pencil about-form-edit-button ${editing ? "hidden" : ""}`} onClick={() => setEditing("Description")} />
                        </div>
                        <div className={`about-input-prompt-right ${editing === "Description" ? "" : "hidden"}`}>
                            <p className="about-form-cancel-button" onClick={() => setEditing(false)}>Cancel</p>
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
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            setWarn(false)
                        }}
                    />
                    <p className={`about-form-chars-container ${editing === "Description" ? "" : "hidden"}`}>
                        {description?.length <= 5000 ?
                            <p>{description?.length || 0} of 5000 char</p>
                            :
                            <p>Your description exceeds the character limit <span>({description?.length || 0} of 5000 char)</span></p>}
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ClassAbout
