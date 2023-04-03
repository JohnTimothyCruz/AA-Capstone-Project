import { useState } from "react";
import "./NotFoundPage.css"

const NotFoundPage = () => {
    const [revealed, setRevealed] = useState(false);

    return (
        <div id="not-found-page">
            <h1 id="not-found-prompt">404 page not found</h1>
            <div id="not-found-card">
                <div id="not-found-card-top"></div>
                <div id="not-found-card-bottom">
                    <p id="not-found-card-letter">{revealed ? "A" : "Q"}</p>
                    {revealed ?
                        <p>To put simply, a 404 error is when user tries to access a page that, for multiple possible reasons, does not exist.</p>
                        :
                        <p>What is a 404 error?</p>
                    }
                </div>
            </div>
            <div id="not-found-reveal-card" onClick={() => setRevealed(!revealed)}>
                {revealed ?
                    "REVEAL QUESTION"
                    :
                    "REVEAL ANSWER"
                }
            </div>
        </div>
    )
}

export default NotFoundPage
