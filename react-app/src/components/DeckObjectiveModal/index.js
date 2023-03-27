import { useModal } from "../../context/Modal";
import "./DeckObjectiveModal.css"

const DeckObjectiveModal = ({ props }) => {
    const [deck] = props;
    const { closeModal } = useModal();

    return (
        <div id="view-deck-modal">
            <i id="close-view-deck-modal-button" className="fa-solid fa-xmark fa-2xl" onClick={() => closeModal()}/>
            <h2 id="view-deck-prompt">{deck?.name}</h2>
            <h3 id="view-deck-explaination">{deck?.objective?.length ? deck?.objective : "No description entered for this deck"}</h3>
            <div id="view-deck-ok-button" onClick={() => closeModal()}>OK</div>
        </div>
    )
}

export default DeckObjectiveModal
