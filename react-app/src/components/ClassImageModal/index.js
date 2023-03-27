import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./ClassImageModal.css"
import { imagePutClass } from "../../store/classes";

const ClassImageModal = ({ props }) => {
    const dispatch = useDispatch();
    const [chosenClass, user_id] = props;
    const { closeModal } = useModal();

    const images = [
        "https://www.brainscape.com/assets/ugs-icons/athletics-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/atom-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/brain-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/beaker-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/entertainment-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/family-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/food-and-dining-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/gears-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/globe-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/hourglass-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/in-cloud-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/laptop-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/light-bulb-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/math-ops-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/medical-aid-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/medical-practice-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/microscope-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/official-institution-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/scales-of-justice-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/scribe-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/smiley-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/tools-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/translation-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/travel-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/trends-icon.png",
        "https://www.brainscape.com/assets/ugs-icons/generic-icon.png"
    ]

    const handleImageSelect = (image) => {
        dispatch(imagePutClass(image, chosenClass?.id, user_id))
            .then(closeModal)
    }

    return (
        <div id="class-image-selection-container">
            <i onClick={closeModal} id="class-image-selection-close-button" className="fa-solid fa-xmark fa-2xl" />
            <div id="class-image-selection-text-container">
                <h2 id="class-image-selection-prompt">Choose Class Icon</h2>
                <h3 id="class-image-selection-text">Select an icon for your {chosenClass?.name} Class.</h3>
            </div>
            <div id="class-image-selection">
                <img onClick={() => handleImageSelect(images[0])} src={images[0]} alt="class" />
                <img onClick={() => handleImageSelect(images[1])} src={images[1]} alt="class" />
                <img onClick={() => handleImageSelect(images[2])} src={images[2]} alt="class" />
                <img onClick={() => handleImageSelect(images[3])} src={images[3]} alt="class" />
                <img onClick={() => handleImageSelect(images[4])} src={images[4]} alt="class" />
                <img onClick={() => handleImageSelect(images[5])} src={images[5]} alt="class" />
                <img onClick={() => handleImageSelect(images[6])} src={images[6]} alt="class" />
                <img onClick={() => handleImageSelect(images[7])} src={images[7]} alt="class" />
                <img onClick={() => handleImageSelect(images[8])} src={images[8]} alt="class" />
                <img onClick={() => handleImageSelect(images[9])} src={images[9]} alt="class" />
                <img onClick={() => handleImageSelect(images[10])} src={images[10]} alt="class" />
                <img onClick={() => handleImageSelect(images[11])} src={images[11]} alt="class" />
                <img onClick={() => handleImageSelect(images[12])} src={images[12]} alt="class" />
                <img onClick={() => handleImageSelect(images[13])} src={images[13]} alt="class" />
                <img onClick={() => handleImageSelect(images[14])} src={images[14]} alt="class" />
                <img onClick={() => handleImageSelect(images[15])} src={images[15]} alt="class" />
                <img onClick={() => handleImageSelect(images[16])} src={images[16]} alt="class" />
                <img onClick={() => handleImageSelect(images[17])} src={images[17]} alt="class" />
                <img onClick={() => handleImageSelect(images[18])} src={images[18]} alt="class" />
                <img onClick={() => handleImageSelect(images[19])} src={images[19]} alt="class" />
                <img onClick={() => handleImageSelect(images[20])} src={images[20]} alt="class" />
                <img onClick={() => handleImageSelect(images[21])} src={images[21]} alt="class" />
                <img onClick={() => handleImageSelect(images[22])} src={images[22]} alt="class" />
                <img onClick={() => handleImageSelect(images[23])} src={images[23]} alt="class" />
                <img onClick={() => handleImageSelect(images[24])} src={images[24]} alt="class" />
                <img onClick={() => handleImageSelect(images[25])} src={images[25]} alt="class" />
            </div>
            <p onClick={closeModal} id="class-image-cancel-button">Cancel</p>
        </div>
    )
}

export default ClassImageModal
