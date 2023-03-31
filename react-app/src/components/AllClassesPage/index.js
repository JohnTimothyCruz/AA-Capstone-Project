import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getClasses } from "../../store/classes";
import "./AllClassesPage.css"

const AllClassesPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const unfilteredClasses = useSelector(state => state.classes.allClasses)
    const filterClasses = () => {
        const arr = []
        if (unfilteredClasses) {
            for (const a_class of Object.values(unfilteredClasses)) {
                if (a_class?.visibility === "public") {
                    arr.push(a_class)
                }
            }
        }
            return arr
    }
    const classes = filterClasses()

    const getCardNumber = (a_class) => {
        let num = 0
        for (const deck of a_class.decks) {
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
            <h1 id="all-classes-prompt">BrainBash Classes</h1>
            <p id="all-classes-explanation">Find a class that suits your needs and study it for absolutely free!</p>
            <div id="classes-container">
                {classes ? classes.map((a_class, idx) => (
                    <div className="class-card-container" onClick={() => history.push(`/classes/${a_class?.id}`)} key={idx}>
                        <img className="class-card-image" src={a_class?.image} alt="class" />
                        <div className="class-card-info-container">
                            <h2 className="class-card-class-name">{a_class?.name}</h2>
                            <p className="class-card-class-creator">FLASHCARD MAKER:
                                <span className="class-card-class-creator-name">{" " + a_class?.user?.username.toUpperCase()}</span>
                            </p>
                            <p className="class-card-class-stats">{getCardNumber(a_class)} Cards - {a_class?.decks?.length} Decks - {a_class?.learners?.length} Learners</p>
                            <p className="class-card-class-decks">Sample Decks: {getSampleDecks(a_class)}</p>
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
