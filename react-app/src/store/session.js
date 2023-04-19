// -Action Types---------------
const SET_USER = "session/SET_USER";
const GET_USER = "session/GET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const POST_LEARNING = "classes/POST_LEARNING"
const DELETE_LEARNING = "classes/DELETE_LEARNING"

// -Actions--------------------
const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const fetchUser = (user) => ({
	type: GET_USER,
	user
})

const removeUser = () => ({
	type: REMOVE_USER,
});

const createLearning = (learning) => ({
	type: DELETE_LEARNING,
	learning
})

const removeLearning = (learner_id) => ({
	type: DELETE_LEARNING,
	learner_id
})

// -Thunks---------------------
export const getUser = (id) => async dispatch => {
	try {

		const res = await fetch(`/api/users/${id}`)

		if (res.ok) {
			const user = await res.json();

			dispatch(setUser(user))
		}
	} catch (e) {}
}

export const getOtherUser = (id) => async dispatch => {
	const res = await fetch(`/api/users/${id}`)

	if (res.ok) {
		const user = await res.json();

		dispatch(fetchUser(user))
	}
}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, first_name, last_name, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			first_name,
			last_name,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const postLearning = (learner) => async dispatch => {
	dispatch(createLearning(learner))
}

export const deleteLearning = (learning_id) => async dispatch => {
	dispatch(removeLearning(learning_id))
}

// -Reducer--------------------
const initialState = { user: null, otherUser: null };

export default function reducer(state = initialState, action) {
	const newState = { ...state }
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case GET_USER:
			newState.otherUser = action.user
			return newState
		case REMOVE_USER:
			return { user: null };
		case POST_LEARNING:
			newState.user.learning.push(action.learner)
			return newState
		case DELETE_LEARNING:
			const updatedLearning = newState.user.learning.filter(learner => learner.id !== action.learner_id)
			newState.user.learning = updatedLearning
			return newState
		default:
			return state;
	}
}
