// -Action Types---------------
const GET_DECKS = "decks/GET_DECKS"
const GET_DECK = "decks/GET_DECK"
const POST_DECK = "decks/POST_DECK"
const PUT_DECK = "decks/PUT_DECK"
const DELETE_DECK = "decks/DELETE_DECK"

// -Actions--------------------
export const readDecks = (decks) => {
    return {
        type: GET_DECKS,
        decks
    }
}

export const readDeck = (deck) => {
    return {
        type: GET_DECK,
        deck
    }
}

export const createDeck = (deck) => {
    return {
        type: POST_DECK,
        deck
    }
}

export const updateDeck = (deck) => {
    return {
        type: PUT_DECK,
        deck
    }
}

export const removeDeck = (id) => {
    return {
        type: DELETE_DECK,
        id
    }
}


// -Thunks---------------------
export const getDecks = (id) => async dispatch => {
    const res = await fetch(`/api/decks`);

    if (res.ok) {
        const decks = await res.json();
        dispatch(readDecks(decks));
    };
};

export const getDeck = (id) => async dispatch => {
    const res = await fetch(`/api/decks/${id}`);

    if (res.ok) {
        const deck = await res.json();
        dispatch(readDeck(deck));
    };
};

export const postDeck = (name, user_id) => async dispatch => {
    const res = await fetch(`/api/decks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id, name})
    });

    if (res.ok) {
        const deck = await res.json();
        dispatch(createDeck(deck));
    };
};

export const putDeck = (name, objective, user_id) => async dispatch => {
    const res = await fetch(`/api/decks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, objective, user_id})
    });

    if (res.ok) {
        const deck = await res.json();
        dispatch(updateDeck(deck));
    };
};

export const deleteDeck = (chosenDeck) => async dispatch => {
    const res = await fetch(`/api/classes/${chosenDeck.id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(removeDeck(chosenDeck.id));
    }
};

// -Reducer--------------------
const initialState = { allDecks: {}, singleDeck: {} }

const DeckReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_CLASSES:
            action.decks.forEach(deck => {
                newState.allDecks[deck.id] = deck
            })
            return newState;
        case GET_CLASS:
            newState.singleDeck[action.deck.id] = action.deck
            return newState;
        case POST_CLASS:
            newState.allDecks[action.deck.id] = action.deck
            return newState
        case PUT_CLASS:
            newState.allDecks[action.deck.id] = action.deck
            return newState
        case DELETE_CLASS:
            delete newState.allDecks[action.id]
            return newState
        default:
            return state
    }
}

export default DeckReducer
