import { useModal } from "../../context/Modal";
import "./NoCardsModal.css"

const NoCardsModal = () => {
    const { closeModal } = useModal();

    return (
        <div id="no-cards-modal">
            <i id="close-no-cards-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()} />
            <h2 id="no-cards-prompt">This Deck Has No Cards</h2>
            <h3 id="no-cards-explaination">Before you can study this deck, you or the Class creator must add cards to this deck.</h3>
            <div id="no-cards-cancel-button" onClick={() => closeModal()} >OK</div>
        </div>
    )
}

export default NoCardsModal
