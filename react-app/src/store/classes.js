import { getUser } from "./session"

// -Action Types---------------
const GET_CLASSES = "classes/GET_CLASSES"
const GET_CLASS = "classes/GET_CLASS"
const POST_CLASS = "classes/POST_CLASS"
const PUT_CLASS = "classes/PUT_CLASS"
const DELETE_CLASS = "classes/DELETE_CLASS"

const POST_LEARNER = "classes/POST_LEARNER"

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

// -Thunks---------------------
export const getClasses = () => async dispatch => {
    const res = await fetch("/api/classes");

    if (res.ok) {
        const classes = await res.json();
        dispatch(readClasses(classes));
    };
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
        dispatch(postLearner(newClass.id, user_id));
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

export const deleteClass = (chosenClass, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${chosenClass.id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(removeClass(chosenClass.id));
        dispatch(getClasses())
        dispatch(getUser(user_id))
    }
};

export const postLearner = (class_id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${class_id}/learners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, class_id })
    });

    if (res.ok) {
        const newLearner = await res.json();
        dispatch(createLearner(newLearner, class_id))
        return newLearner
    };
}

export const deleteLearner = (class_id, learner_id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${class_id}/learners/${learner_id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(getUser(user_id));
    }
};

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
            newState.allClasses[action.learner.id] = action.learner
            return newState
        default:
            return state
    }
}

export default ClassReducer
