import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import "./HomePage.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HomePage = () => {
    const history = useHistory();

    const session = useSelector(state => state.session)

    const swapImage = () => {
        const imageContainer = document.getElementById("images-container")
        const imageList = document.getElementsByClassName("carousel-image")
        const firstImage = imageList[0]

        imageContainer.classList.add("transitioning")

        imageContainer.addEventListener("animationend", () => {
            imageContainer.removeChild(firstImage)
            imageContainer.appendChild(firstImage)
            imageContainer.classList.remove("transitioning")
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            swapImage()
        }, 2500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div id="homepage">
            <div id="image-carousel">
                <div id="images-container">
                    <img className="carousel-image" src="https://www.brainscape.com/pks/static/assets/images/cms/public-views/pages/landing/band-1/image-1-e10d192395aee617c5e9.jpg"></img>
                    <img className="carousel-image" src="https://www.brainscape.com/assets/cms/public-views/pages/landing/band-1/image-2.jpg"></img>
                    <img className="carousel-image" src="https://www.brainscape.com/assets/cms/public-views/pages/landing/band-1/image-3.jpg"></img>
                    <img className="carousel-image" src="https://www.brainscape.com/assets/cms/public-views/pages/landing/band-1/image-4.jpg"></img>
                    <img className="carousel-image" src="https://www.brainscape.com/assets/cms/public-views/pages/landing/band-1/image-5.jpg"></img>
                    <img className="carousel-image" src="https://www.brainscape.com/assets/cms/public-views/pages/landing/band-1/image-6.jpg"></img>
                    <img className="carousel-image" src="https://www.brainscape.com/assets/cms/public-views/pages/landing/band-1/image-7.jpg"></img>
                    <img className="carousel-image" src="https://www.brainscape.com/assets/cms/public-views/pages/landing/band-1/image-8.jpg"></img>
                </div>
            </div>
            <div id="homepage-text-container">
                <h2 className="homepage-h2">Rise to</h2>
                <h2 className="homepage-h2"> your challenge.</h2>
                <h3 id="homepage-h3">
                    <span>Flashcards for</span> <span id="homepage-span">serious learners.</span>
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
                {/* <div onClick={() => swapImage()}>
                    test here
                </div> */}
            </div>
        </div>
    )
}

export default HomePage
