import { getClasses } from "./classes";

// -Action Types---------------
const DELETE_LEARNER = "classes/DELETE_LEARNER"

// -Actions--------------------
export const removeLearner = (id) => {
    return {
        type: DELETE_LEARNER,
        id
    }
}

// -Thunks---------------------
export const deleteClass = (id, user_id) => async dispatch => {
    const res = await fetch(`/api/classes/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(removeLearner(id));
    }
};

// -Reducer--------------------
const initialState = { allClasses: {}, singleClass: {} }
