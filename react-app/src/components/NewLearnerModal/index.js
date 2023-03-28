import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./NewLearnerModal.css"

const NewLearnerModal = ({ props }) => {
    const [chosenClass] = props;
    const [copied, setCopied] = useState(false)
    const { closeModal } = useModal();

    const copyTo = () => {
        navigator.clipboard.writeText("(link goes here)");

        setCopied(true)
    }

    return (
        <div id="new-learner-modal">
            <i id="close-new-learner-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()} />
            <h2 id="new-learner-prompt">Share Class By Link</h2>
            <h3 id="new-learner-explaination">The custom link below will give anyone full study access to {<span id="new-learner-class">{chosenClass?.name}</span>}. You can paste it anywhere, including on your website, blog, or in social media.</h3>
            <p id="new-learner-link">(link goes here)</p>
            <div id="new-learner-copy" onClick={() => copyTo()} className={copied ? "copied" : ""}>
                {copied ?
                    <p className="new-learner-copy-text">Copied to Clipboard</p>
                    :
                    <p className="new-learner-copy-text">Copy to Clipboard</p>
                }
                <i className="fa-regular fa-clipboard" />
            </div>
            <div id="new-learner-done-button" onClick={() => closeModal()}>DONE</div>
        </div>
    )
}

export default NewLearnerModal
