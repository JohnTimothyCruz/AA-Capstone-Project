import { useState } from "react";
import "./ClassAbout.css";

const ClassAbout = ({ props }) => {
    const [session, chosenClass] = props;
    const [menu, setMenu] = useState("headline");
    const [headline, setHeadline] = useState(chosenClass?.headline);
    const [description, setDescription] = useState(chosenClass?.description);
    const [visibility, setVisibility] = useState(chosenClass?.visibility);
    const [mixType, setMixType] = useState(chosenClass?.mixType);
    const [editing, setEditing] = useState(false)

    return (
        <div id="about-page-container">
            <div id="about-side-panel">
                <div
                    className={`about-panel-section ${menu === "headline" ? "selected" : ""}`}
                    onClick={() => setMenu("headline")}
                >
                    Headline
                </div>
                <div
                    className={`about-panel-section ${menu === "description" ? "selected" : ""}`}
                    onClick={() => setMenu("description")}
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
                <div id="about-preview-container">
                    <i id="about-preview-close-button" class="fa-solid fa-xmark fa-sm" />
                    <p id="about-preview-button">Preview</p>
                </div>
                <form className="about-page-form">
                    <div className="about-input-prompt-container">
                        <div className="about-input-prompt-left">
                            <p className="about-input-prompt">Headline</p>
                            <i className="fa-solid fa-circle-info about-form-info" />
                            <i className={`fa-solid fa-pencil about-form-edit-button ${editing ? "hidden" : ""}`} onClick={() => setEditing("headline")} />
                        </div>
                        <div className={`about-input-prompt-right ${editing === "headline" ? "" : "hidden"}`}>
                            <p className="about-form-cancel-button" onClick={() => setEditing(false)} >Cancel</p>
                            <div className="about-form-save-button">SAVE CHANGES</div>
                        </div>
                    </div>
                    <div className={editing === "headline" ? "hidden" : ""}>
                        {headline ? headline : "No headline. Click the Edit button to add a headline."}
                    </div>
                    <textarea
                        id="about-headline-form"
                        className={editing === "headline" ? "" : "hidden"}
                        placeholder="Enter a short description of your class"
                    />
                </form>
                <form className="about-page-form">
                    <div className="about-input-prompt-container">
                        <div className="about-input-prompt-left">
                            <p className="about-input-prompt">Headline</p>
                            <i className="fa-solid fa-circle-info about-form-info" />
                            <i className={`fa-solid fa-pencil about-form-edit-button ${editing ? "hidden" : ""}`} onClick={() => setEditing("description")} />
                        </div>
                        <div className={`about-input-prompt-right ${editing === "description" ? "" : "hidden"}`}>
                            <p className="about-form-cancel-button" onClick={() => setEditing(false)}>Cancel</p>
                            <div className="about-form-save-button">SAVE CHANGES</div>
                        </div>
                    </div>
                    <div className={editing === "description" ? "hidden" : ""}>
                        {headline ? headline : "No headline. Click the Edit button to add a headline."}
                    </div>
                    <textarea
                        id="about-description-form"
                        className={editing === "description" ? "" : "hidden"}
                        placeholder="Format your description using markdown."
                    />
                </form>
            </div>
        </div>
    )
}

export default ClassAbout
