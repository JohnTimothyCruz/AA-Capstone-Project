import { useModal } from "../../context/Modal";
import "./AboutModal.css"

const AboutModal = () => {
    const { closeModal } = useModal();

    return (
        <div id="about-modal">
            <i id="close-about-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()}/>
            <h2 id="about-prompt">Get in touch with the creator of BrainBash:</h2>
            <div id="about-me-container">
                <p>John Cruz</p>
            </div>
            <div id="about-close-button" onClick={() => closeModal()}>OK</div>
        </div>
    )
}

export default AboutModal
