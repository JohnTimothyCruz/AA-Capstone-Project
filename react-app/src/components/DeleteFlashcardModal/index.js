import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteFlashcardModal.css"
import { deleteFlashcard } from "../../store/decks";

const DeleteFlashcardModal = ({ props }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [flashcard, idx] = props

    const handleDelete = () => {
        dispatch(deleteFlashcard(flashcard?.id))
            .then(closeModal)
    }

    return (
        <div id="delete-flashcard-modal">
            <i id="close-delete-flashcard-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()} />
            <h2 id="delete-flashcard-prompt">Delete</h2>
            <h3 id="delete-flashcard-explaination">Are you sure that you want to delete Card {idx}: (Q. '{flashcard?.question}')? This action cannot be reverted.</h3>
            <div id="delete-flashcard-buttons-container">
                <div id="delete-flashcard-cancel-button" onClick={() => closeModal()} >CANCEL</div>
                <p id="delete-flashcard-confirm-button" onClick={() => handleDelete()} >OK</p>
            </div>
        </div>
    )
}

export default DeleteFlashcardModal
