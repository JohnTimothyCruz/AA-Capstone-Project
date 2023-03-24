import { getUser } from "./session"

// -Action Types---------------
const GET_CLASSES = "classes/GET_CLASSES"
const GET_CLASS = "classes/GET_CLASS"
const POST_CLASS = "classes/POST_CLASS"
const PUT_CLASS = "classes/PUT_CLASS"
const DELETE_CLASS = "classes/DELETE_CLASS"
const DELETE_LEARNER = "classes/DELETE_LEARNER"

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

export const removeLearner = (learner_id, class_id) => {
    return {
        type: DELETE_LEARNER,
        learner_id,
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
        body: JSON.stringify({user_id, name})
    });

    if (res.ok) {
        const newClass = await res.json();
        dispatch(createClass(newClass));
        dispatch(getUser(user_id));
        return newClass
    };
};

export const putClass = (name, description, headline, mix_type, visibility, id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, description, headline, mix_type, visibility, user_id})
    });

    if (res.ok) {
        const newClass = await res.json();
        dispatch(updateClass(newClass));
    };
};

export const simplePutClass = (name, id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, user_id})
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
        body: JSON.stringify({image, user_id})
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
        dispatch(getUser(chosenClass.user.id));
    }
};

export const deleteLearner = (learner_id, class_id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${class_id}/learners/${learner_id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(removeLearner(learner_id, class_id));
        dispatch(getUser(user_id));
        dispatch(getClasses())
    }
};

// -Reducer--------------------
const initialState = { allClasses: {}, singleClass: {} }

const ClassReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_CLASSES:
            action.classes.forEach(aClass => {
                newState.allClasses[aClass.id] = aClass
            })
            return newState;
        case GET_CLASS:
            delete newState.singleClass[Object.keys(newState.singleClass)[0]]
            newState.singleClass[action.aClass.id] = action.aClass
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
        case DELETE_LEARNER:
            delete newState.allClasses[action.class_id].learners.learner_id
            return newState
        default:
            return state
    }
}

export default ClassReducer
