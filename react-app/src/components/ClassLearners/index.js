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
        navigator.clipboard.writeText(`https://brainbash.onrender.com/classes/${chosenClass?.id}`);

        setCopied(true)
    }

    const getCardNumber = () => {
        let num = 0
        if (chosenClass?.decks) {
            for (const deck of chosenClass.decks) {
                num += deck?.flashcards?.length
            }
        }
        return num
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
            </div>
            <div id="learners-container">
                {chosenClass?.learners && chosenClass.learners.map((learner, idx) => (
                    <SingleLearner props={[learner, getCardNumber, chosenClass, session]} key={idx} />
                ))}
                <div id="add-learner-container-container">
                    <OpenModalButton
                        modalComponent={<NewLearnerModal props={[chosenClass]} />}
                        buttonText={
                            <div id="add-learner-container">
                                <i id="add-learner-circle" className="fa-regular fa-circle fa-xl" />
                                <i id="add-learner-icon" className="fa-solid fa-user-plus fa-xl" />
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
                        <p>{`https://brainbash.onrender.com/classes/${chosenClass?.id}`}</p>
                    </div>
                    <div id="copy-container" className={copied ? "copied" : ""} onClick={() => copyTo()}>
                        {copied ?
                            <p>Copied to Clipboard</p>
                            :
                            <p>Copy to Clipboard</p>
                        }
                        <i className="fa-regular fa-clipboard" />
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
