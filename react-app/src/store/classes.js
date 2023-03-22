// -Action Types---------------
const GET_CLASSES = "classes/GET_CLASSES"
const GET_CLASS = "classes/GET_CLASS"
const POST_CLASS = "classes/POST_CLASS"
const PUT_CLASS = "classes/PUT_CLASS"
const DELETE_CLASS = "classes/DELETE_CLASS"

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

// -Thunks---------------------
export const getClasses = () => async dispatch => {
    const res = await fetch("/api/classes");

    if (res.ok) {
        const classes = await res.json();
        dispatch(readClasses(classes));
    };
};

export const getClass = (id) => async dispatch => {
    const res = await fetch(`api/classes/${id}`);

    if (res.ok) {
        const aClass = await res.json();
        dispatch(readClass(aClass));
    };
};

export const postClass = (classInfo, user) => async dispatch => {
    const res = await fetch(`api/classes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({classInfo, user})
    });

    if (res.ok) {
        const newClass = await res.json();
        dispatch(createClass(newClass));
    };
};

export const putClass = (classInfo, user) => async dispatch => {
    const res = await fetch(`api/classes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({classInfo, user})
    });

    if (res.ok) {
        const newClass = await res.json();
        dispatch(updateClass(newClass));
    };
};

export const deleteClass = (id, user) => async dispatch => {
    const res = await fetch(`api/classes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({classInfo, user})
    });

    if (res.ok) {
        const newClass = await res.json();
        dispatch(removeClass(newClass));
    };
};

// -Reducer--------------------
const initialState = { allClasses: {} }

const ClassReducer = (state = initialState, action) => {
    newState = { ...state }
    switch (action.type) {
        case GET_CLASSES:
            action.classes.forEach(aClass => {
                newState.allClasses[aClass.id] = { ...aClass }
            })
            return newState;
        case GET_CLASS:
            newState.allClasses[action.aClass.id] = action.aClass
            return newState;
        case POST_CLASS:
            newState.allClasses[action.aClass.id] = action.aClass
            return newState
        case PUT_CLASS:
            newState.allClasses[action.aClass.id] = action.aClass
            return newState
        case DELETE_CLASS:
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export default ClassReducer
