import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { postClass } from "../../store/classes";
import "./CreateClassModal.css"


const CreateClassModal = ({ props }) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [className, setClassName] = useState("")
    const [processing, setProcessing] = useState(false)
    const { closeModal } = useModal();
    const [user_id] = props;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setProcessing(true)

        dispatch(postClass(className, user_id))
        .then(res => history.push(`/dashboard/classes/${res.id}`))
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
                {className?.length > 250 &&
                <div id="create-class-input-error">Sorry, but your class title must be less than 250 characters.</div>
                }
                <button
                    id="create-class-form-button"
                    disabled={!className || className?.length > 250 || processing}
                >C O N T I N U E</button>
            </form>
        </div>
    )
}

export default CreateClassModal
