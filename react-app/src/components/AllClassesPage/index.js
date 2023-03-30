import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../store/classes";
import "./AllClassesPage.css"

const AllClassesPage = () => {
    const dispatch = useDispatch()

    const classes = useSelector(state => state.classes.allClasses)

    const getCardNumber = (a_class) => {
        let num = 0
        for (const deck of a_class.decks) {
            console.log(deck)
            num += deck?.flashcards?.length
        }
        return num
    }

    const getSampleDecks = (a_class) => {
        let samples = ""
        if (a_class?.decks[0]) {
            samples += a_class?.decks[0]?.name
            if (a_class?.decks[1]) {
                samples += `, ${a_class?.decks[1]?.name}`
                if (a_class?.decks[2]) {
                    samples += `, ${a_class?.decks[2]?.name}`
                }
            }
        }
        return samples
    }

    useEffect(() => {
        dispatch(getClasses())
    }, [dispatch])

    return (
        <div id="all-classes-page">
            <h1>BrainBash Classes</h1>
            <p>Find a class that suits your needs and study it for absolutely free!</p>
            <div id="classes-container">
                {classes ? Object.values(classes).map((a_class, idx) => (
                    <div className="class-card-container">
                        <img className="class-card-image" src={a_class?.image} alt="class" />
                        <div>
                            <h2>{a_class?.name}</h2>
                            <p>FLASHCARD MAKER: <span>{a_class?.user?.username.toUpperCase()}</span></p>
                            <p>{getCardNumber(a_class)} Cards - {a_class?.decks?.length} Decks - {a_class?.learners?.length} Learners</p>
                            <p>Sample Decks: {getSampleDecks(a_class)}</p>
                        </div>
                        <i className="class-card-caret-right fa-solid fa-chevron-right fa-xl" />
                    </div>
                ))
                    :
                    <div>no classes</div>
                }
            </div>
        </div>
    )
}

export default AllClassesPage
