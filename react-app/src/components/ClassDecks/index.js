import { useHistory } from "react-router-dom";
import CreateDeckModal from "../CreateDeckModal";
import OpenModalButton from "../OpenModalButton";
import "./ClassDecks.css"

const ClassDecks = ({ props }) => {
    const history = useHistory();
    const [session, chosenClass] = props;

    return (
        <div id="dashboard-decks-container">
            <div id="dashboard-decks-prompt">
                <div id="dashboard-decks-prompt-left">
                    <i className="fa-regular fa-circle fa-xl" />
                    <div>Decks</div>
                </div>
                <div id="dashboard-decks-prompt-right">
                    <OpenModalButton
                        modalComponent={<CreateDeckModal user_id={session.user.id} />}
                        buttonText={<i className="fa-solid fa-circle-plus fa-xl" />}
                    />
                </div>
            </div>
            {chosenClass?.decks && chosenClass?.decks.map((deck, idx) => (
                <div className="deck-container" onClick={() => history.push(`/study/decks/${deck?.id}`)} key={idx}>
                    <i className="fa-regular fa-circle fa-xl" />
                    <div className="deck-progress-percent">20%</div>
                    <div className=" deck-info-container">
                        <div className="deck-name">{deck.name}</div>
                        <div className="deck-progress-bar"></div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default ClassDecks
