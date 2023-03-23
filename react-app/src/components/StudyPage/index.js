import { useHistory } from "react-router-dom"
import "./StudyPage.css"

const StudyPage = () => {
    const history = useHistory()

    return (
        <div id="study-page-container">
            <div id="study-page-side-bar">
                <div id="study-page-side-bar-top">
                    <div id="back-to-dashboard-button" onClick={() => history.push("/dashboard")}>
                        <i className="fa-solid fa-chevron-left" />
                        <i className="study-page-logo-icon fa-solid fa-robot fa-2xl" />
                    </div>
                </div>
                <div id="study-page-side-bar-bottom">

                </div>
            </div>
            <div id="study-page">
                <div id="study-page-deck-info-container">
                    <div id="study-page-deck-name">

                    </div>
                    <div id="study-page-deck-flashcard-num">

                    </div>
                </div>
                <div id="study-page-flashcard-container">

                </div>
            </div>
        </div>
    )
}

export default StudyPage
