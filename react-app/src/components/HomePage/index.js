import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import "./HomePage.css";
import { useSelector } from "react-redux";

const HomePage = () => {
    const history = useHistory();

    const session = useSelector(state => state.session)

    return (
        <div id="homepage">
            <div id="homepage-text-container">
                <h2 className="homepage-h2">Rise to</h2>
                <h2 className="homepage-h2"> your challenge.</h2>
                <h3 id="homepage-h3">Flashcards for
                    <span id="homepage-span">{" " + "serious learners."}</span>
                </h3>
                <div id="homepage-button-container">
                    <div
                        id="find-flashcards-button"
                        onClick={() => history.push("/classes")}
                    >Find Flashcards</div>
                    {!session?.user?.id &&
                        <OpenModalButton
                            modalComponent={<SignupFormModal />}
                            buttonText="Make Flashcards"
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage
