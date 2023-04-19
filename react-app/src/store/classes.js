import { getUser, postLearning } from "./session"

// -Action Types---------------
const GET_CLASSES = "classes/GET_CLASSES"
const GET_CLASS = "classes/GET_CLASS"
const POST_CLASS = "classes/POST_CLASS"
const PUT_CLASS = "classes/PUT_CLASS"
const DELETE_CLASS = "classes/DELETE_CLASS"

const POST_LEARNER = "classes/POST_LEARNER"
const PUT_LEARNER = "classes/PUT_LEARNER"
const DELETE_LEARNER = "classes/DELETE_LEARNER"

const POST_STUDIED = "classes/POST_STUDIED"

// -Actions--------------------
export const readClasses = (classes) => {
    return {
        type: GET_CLASSES,
        classes
    }
}

export const readClass = (aClass) => {
    return {
        type: GET_CLASS,
        aClass
    }
}

export const createClass = (aClass) => {
    return {
        type: POST_CLASS,
        aClass
    }
}

export const updateClass = (aClass) => {
    return {
        type: PUT_CLASS,
        aClass
    }
}

export const removeClass = (id) => {
    return {
        type: DELETE_CLASS,
        id
    }
}

export const createLearner = (learner, class_id) => {
    return {
        type: POST_LEARNER,
        learner,
        class_id
    }
}

export const editLearner = (learner, class_id) => {
    return {
        type: PUT_LEARNER,
        learner,
        class_id
    }
}

export const removeLearner = (learner_id, class_id) => {
    return {
        type: DELETE_LEARNER,
        learner_id,
        class_id
    }
}

export const createStudied = (card, learner_id, class_id) => {
    return {
        type: POST_STUDIED,
        card,
        learner_id,
        class_id
    }
}

// -Thunks---------------------
export const getClasses = () => async dispatch => {
    try {
        const res = await fetch("/api/classes");

        if (res.ok) {
            const classes = await res.json();
            dispatch(readClasses(classes));
        };
    } catch (e) {}
};

export const getClass = (id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`);

    if (res.ok) {
        const aClass = await res.json();
        dispatch(readClass(aClass));
    };
};

export const postClass = (name, user_id) => async dispatch => {
    const res = await fetch(`/api/classes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, name })
    });

    if (res.ok) {
        const newClass = await res.json();
        dispatch(createClass(newClass));
        dispatch(getUser(user_id));
        return newClass
    };
};

export const simplePutClass = (name, id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, user_id })
    })

    if (res.ok) {
        const newClass = await res.json();
        dispatch(updateClass(newClass));
    };
}

export const imagePutClass = (image, id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, user_id })
    })

    if (res.ok) {
        const newClass = await res.json();
        dispatch(updateClass(newClass));
    };
}

export const headlinePutClass = (headline, id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline, user_id })
    })

    if (res.ok) {
        const newClass = await res.json();
        dispatch(updateClass(newClass));
    };
}

export const descriptionPutClass = (description, id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, user_id })
    })

    if (res.ok) {
        const newClass = await res.json();
        dispatch(updateClass(newClass));
    };
}

export const mixPutClass = (mix_type, id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mix_type, user_id })
    })

    if (res.ok) {
        const newClass = await res.json();
        dispatch(updateClass(newClass));
    };
}

export const visibilityPutClass = (visibility, id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility, user_id })
    })

    if (res.ok) {
        const newClass = await res.json();
        dispatch(updateClass(newClass));
    };
}

export const deleteClass = (chosenClass) => async dispatch => {
    const res = await fetch(`/api/classes/${chosenClass.id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(removeClass(chosenClass.id));
        dispatch(getClasses())
    }
}

export const postLearner = (class_id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${class_id}/learners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, class_id })
    });

    if (res.ok) {
        const newLearner = await res.json();
        dispatch(createLearner(newLearner, class_id))
        dispatch(postLearning(newLearner))
        return newLearner
    }
}

export const putLearnerTime = (class_id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${class_id}/users/${user_id}/minutes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, class_id })
    });

    if (res.ok) {
        const updatedLearner = await res.json();
        dispatch(editLearner(updatedLearner, class_id))
    }
}

export const putLearnerCardsStudied = (class_id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${class_id}/users/${user_id}/studied`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, class_id })
    });

    if (res.ok) {
        const updatedLearner = await res.json();
        dispatch(editLearner(updatedLearner, class_id))
    }
}

export const putLearnerDaysStudied = (class_id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${class_id}/users/${user_id}/days`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, class_id })
    });

    if (res.ok) {
        const updatedLearner = await res.json();
        dispatch(editLearner(updatedLearner, class_id))
    }
}

export const deleteLearner = (class_id, learner_id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${class_id}/learners/${learner_id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(removeLearner(learner_id, class_id))
        dispatch(getUser(user_id));
    }
};

export const postStudied = (flashcard_id, learner_id, class_id, deck_id) => async dispatch => {
    const res = await fetch(`/api/flashcards/${flashcard_id}/learners/${learner_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learner_id, flashcard_id, class_id, deck_id })
    })

    if (res.ok) {
        const card = await res.json()
        dispatch(createStudied(card, learner_id, class_id))
    }
}

// -Reducer--------------------
const initialState = { allClasses: {}, singleClass: {} }

const ClassReducer = (state = initialState, action) => {
    const newState = { ...state, allClasses: { ...state.allClasses }, singleClass: { ...state.singleClass } }
    switch (action.type) {
        case GET_CLASSES:
            action.classes.forEach(aClass => {
                newState.allClasses[aClass.id] = aClass
            })
            return newState;
        case GET_CLASS:
            delete newState.singleClass[Object.keys(newState.singleClass)[0]]
            newState.singleClass = action.aClass
            return newState;
        case POST_CLASS:
            newState.allClasses[action.aClass.id] = action.aClass
            return newState
        case PUT_CLASS:
            newState.allClasses[action.aClass.id] = action.aClass
            return newState
        case DELETE_CLASS:
            delete newState.allClasses[action.id]
            return newState
        case POST_LEARNER:
            newState.allClasses[action.class_id].learners.push(action.learner)
            return newState
        case PUT_LEARNER:
            const updatedState = newState.allClasses[action.class_id].learners.filter(learner => learner.id !== action.learner.id)
            newState.allClasses[action.class_id].learners = [...updatedState, action.learner]
            return newState
        case DELETE_LEARNER:
            const updated_learners = newState.allClasses[action.class_id].learners.filter(learner => learner.id !== action.learner_id)
            newState.allClasses[action.class_id].learners = updated_learners
            return newState
        case POST_STUDIED:
            for (const learner of newState.allClasses[action.class_id].learners) {
                if (learner?.id === action.learner_id) {
                    learner?.studied_cards.push(action.card)
                }
            }
            return newState
        default:
            return state
    }
}

export default ClassReducer
