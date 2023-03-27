import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { putDeck } from "../../store/decks";
import "./EditDeckModal.css"

const EditDeckModal = ({ props }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [chosenClass, deck] = props;
    const [name, setName] = useState(deck?.name || "")
    const [objective, setObjective] = useState(deck?.objective || "")
    const [errs, setErrs] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === deck?.name && objective === deck?.objective) {
            closeModal()
        }

        setErrs([])
        const errMessages = []
        if (!name.length) {
            errMessages.push("A value for Name is required.")
        } else if (name.length > 250) {
            errMessages.push("Name needs to be less than 250 characters.")
        }
        if (objective.length > 500) {
            errMessages.push("Objective needs to be less than 500 characters.")
        }

        if (errMessages.length) {
            setErrs(errMessages)
        } else {
            dispatch(putDeck(name, objective, deck?.id, chosenClass?.id))
                .then(closeModal)
        }
    }

    return (
        <div id="edit-deck-modal">
            <i id="close-edit-deck-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()} />
            <h2 id="edit-deck-prompt">Edit Deck</h2>
            <form id="edit-deck-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="edit-deck-form-section">
                    <p className="edit-deck-input-text">Name</p>
                    <input
                        id="edit-deck-name-input"
                        className="edit-deck-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="edit-deck-form-section">
                    <p className="edit-deck-input-text">Objective</p>
                    <textarea
                        id="edit-deck-objective-input"
                        className="edit-deck-input"
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                    />
                </div>
                <div id="edit-form-errors-container">
                    {errs.map((err, idx) => (
                        <div className="edit-form-error" key={idx}>{err}</div>
                    ))}
                </div>
                <div id="edit-deck-buttons-container">
                    <div id="edit-deck-cancel-button" onClick={() => closeModal()}>CANCEL</div>
                    <button id="edit-deck-save-button">SAVE</button>
                </div>
            </form>
        </div>
    )
}

export default EditDeckModal
