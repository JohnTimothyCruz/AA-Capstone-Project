import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getClasses, postClass } from "../../store/classes";
import "./CreateClassModal.css"


const CreateClassModal = ({ user_id }) => {
    console.log(user_id)
    const dispatch = useDispatch();
    const [className, setClassName] = useState("")
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(postClass(className, user_id))
        .then(closeModal)
    }

    return (
        <div id="create-class-modal">
            <i id="close-create-class-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()}/>
            <h2 id="create-class-prompt">Create New Class</h2>
            <h3 id="create-class-explaination">A Class is a set of Flashcards, grouped into Decks</h3>
            <form id="create-class-form" onSubmit={(e) => handleSubmit(e)}>
                <input
                    id="create-class-title-input"
                    placeholder="e.g. Biology 101, Constitutional Law"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
                <p id="create-class-input-text">Enter the title of your new class above</p>
                <button
                    id="create-class-form-button"
                    disabled={!className}
                >C O N T I N U E</button>
            </form>
        </div>
    )
}

export default CreateClassModal
