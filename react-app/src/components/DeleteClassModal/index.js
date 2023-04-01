import { deleteClass, deleteLearner } from "../../store/classes";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./DeleteClassModal.css"

const DeleteClassModal = ({ props }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [chosenClass, session, type] = props
    const { closeModal } = useModal();

    const getLearnerId = () => {
        if (chosenClass) {
            for (const l of Object.values(chosenClass?.learners)) {
                if (l.user_id === session.user.id) {
                    return l.id
                }
            }
        }
    }

    const handleRemove = () => {
        if (type === "remove") {
            dispatch(deleteLearner(chosenClass?.id, getLearnerId(), session?.user?.id))
                .then(history.push("/dashboard"))
                .then(closeModal)
        } else {
            dispatch(deleteLearner(chosenClass?.id, getLearnerId(), session?.user?.id))
            dispatch(deleteClass(chosenClass, session?.user?.id))
                .then(history.push("/dashboard"))
                .then(closeModal)
        }
    }

    return (
        <div id="delete-class-modal">
            <i id="close-delete-class-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()} />
            <h2 id="delete-class-prompt">Caution</h2>
            <h3 id="delete-class-explaination">Are you sure that you want to Remove this class from your library? This action cannot be undone.</h3>
            <div id="delete-class-buttons-container">
                <div id="delete-class-cancel-button" onClick={() => handleRemove()} >YES, PLEASE PROCEED</div>
                <p id="delete-class-confirm-button" onClick={() => closeModal()} >No, Cancel</p>
            </div>
        </div>
    )
}

export default DeleteClassModal
