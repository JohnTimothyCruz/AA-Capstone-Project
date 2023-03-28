import { useDispatch } from "react-redux";
import { useState } from "react";
import NewLearnerModal from "../NewLearnerModal";
import OpenModalButton from "../OpenModalButton";
import SingleLearner from "../SingleLearner";
import "./ClassLearners.css"
import { visibilityPutClass } from "../../store/classes";

const ClassLearners = ({ props }) => {
    const dispatch = useDispatch()
    const [session, chosenClass] = props;
    const [visibility, setVisibility] = useState(chosenClass?.visibility);
    const [copied, setCopied] = useState(false)

    const copyTo = () => {
        navigator.clipboard.writeText("(link goes here)");

        setCopied(true)
    }

    const handleVisibilityRadios = (type) => {
        if (type !== visibility) {
            dispatch(visibilityPutClass(type, chosenClass?.id, session?.user?.id))
                .then(setVisibility(type))
        }
    }

    return (
        <div id="learners-page-container">
            <div id="learner-info-bar">
                <p id="learner-prompt" className="learner-info-bar-header">Learner</p>
                <p id="learner-mastery" className="learner-info-bar-header">Mastery</p>
                <p id="learner-days" className="learner-info-bar-header">Days Studied</p>
                <p id="learner-time" className="learner-info-bar-header">Time Studied</p>
                <p id="learner-cards" className="learner-info-bar-header">Cards Studied</p>
                <p id="learner-permission" className="learner-info-bar-header">Cards Permission</p>
            </div>
            {/* <div id="selected-learners-options">
                <div id="selected-learners-options-left">
                    <p>Bulk actions for 1 selected Learner(s)</p>
                </div>
                <div id="selected-learners-options-right">
                    <i class="fa-solid fa-angle-up" />
                </div>
            </div> */}
            <div id="learners-container">
                {chosenClass?.learners && chosenClass.learners.map((learner, idx) => (
                    <SingleLearner props={[learner]} key={idx} />
                ))}
                <div id="add-learner-container-container">
                    <OpenModalButton
                        modalComponent={<NewLearnerModal props={[chosenClass]} />}
                        buttonText={
                            <div id="add-learner-container">
                                <i id="add-learner-circle" className="fa-regular fa-circle fa-xl" />
                                <i id="add-learner-icon" class="fa-solid fa-user-plus fa-xl" />
                                <div id="add-learner-right">
                                    <p id="add-learner-prompt">Add New Learner</p>
                                    <div id="add-learner-progress-bar"></div>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
            <div id="learners-page-extras">
                <div id="share-link-container">
                    <p>SHARE LINK:</p>
                    <div id="link-container">
                        <i className="fa-solid fa-link" />
                        <p>Link goes here</p>
                    </div>
                    <div id="copy-container" className={copied ? "copied" : ""} onClick={() => copyTo()}>
                        {copied ?
                            <p>Copied to Clipboard</p>
                            :
                            <p>Copy to Clipboard</p>
                        }
                        <i class="fa-regular fa-clipboard" />
                    </div>
                </div>
                <div id="class-visibility-container">
                    <p id="learner-radio-prompt">CLASS VISIBILITY:</p>
                    <div id="radio-section-radios">
                        <div className="radio-container">
                            <input
                                type="radio"
                                id="public"
                                name="visibility"
                                checked={visibility === "public"}
                                onChange={() => handleVisibilityRadios("public")}
                            />
                            <label htmlFor="public">Public</label>
                        </div>
                        <div className="radio-container">
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
    )
}

export default ClassLearners
