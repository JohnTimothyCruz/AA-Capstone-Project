import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteDeck } from "../../store/decks";
import "./DeleteDeckModal.css"

const DeleteDeckModal = ({ props }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [chosenClass, deck] = props;

    const handleConfirmDelete = () => {
        dispatch(deleteDeck(chosenClass?.id, deck?.id))
            .then(closeModal)
    }

    return (
        <div id="delete-deck-modal">
            <i id="close-delete-deck-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()} />
            <h2 id="delete-deck-prompt">Caution</h2>
            <h3 id="delete-deck-explaination">You are about to Remove this Deck. Are you sure that you wish to proceed?</h3>
            <div id="delete-deck-buttons-container">
                <div id="delete-deck-cancel-button" onClick={() => closeModal()} >CANCEL</div>
                <p id="delete-deck-confirm-button" onClick={() => handleConfirmDelete()}>Yes, continue</p>
            </div>
        </div>
    )
}

export default DeleteDeckModal
