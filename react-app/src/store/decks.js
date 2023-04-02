import { getClass, getClasses } from "./classes"
import { getUser } from "./session"

// -Action Types---------------
const GET_DECKS = "decks/GET_DECKS"
const GET_DECK = "decks/GET_DECK"
const POST_DECK = "decks/POST_DECK"
const PUT_DECK = "decks/PUT_DECK"
const DELETE_DECK = "decks/DELETE_DECK"

const POST_FLASHCARD = "decks/POST_FLASHCARDS"
const PUT_FLASHCARD = "decks/PUT_FLASHCARDS"
const DELETE_FLASHCARD = "decks/DELETE_FLASHCARDS"

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

export const createFlashcard = (flashcard, deck_id) => {
    return {
        type: POST_FLASHCARD,
        flashcard,
        deck_id
    }
}

export const editFlashcard = (flashcard, deck_id) => {
    return {
        type: PUT_FLASHCARD,
        flashcard,
        deck_id
    }
}

export const removeFlashcard = (flashcard, deck_id) => {
    return {
        type: DELETE_FLASHCARD,
        flashcard,
        deck_id
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
        return deck
    };
};

export const postDeck = (name, class_id, user_id) => async dispatch => {
    const res = await fetch(`/api/decks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class_id, name })
    });

    if (res.ok) {
        const deck = await res.json();
        dispatch(createDeck(deck));
        dispatch(getUser(user_id));
        dispatch(getClasses())
        return deck
    };
};

export const putDeck = (name, objective, id, class_id) => async dispatch => {
    const res = await fetch(`/api/decks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class_id, name, objective })
    });

    if (res.ok) {
        const deck = await res.json();
        dispatch(updateDeck(deck));
        dispatch(getClasses())
        dispatch(getClass(class_id))
    };
};

export const deleteDeck = (class_id, id) => async dispatch => {
    const res = await fetch(`/api/decks/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(removeDeck(id));
        dispatch(getClasses())
        dispatch(getClass(class_id))
    }
};

export const postFlashcard = (question, answer, question_image, answer_image, deck_id) => async dispatch => {
    const res = await fetch(`/api/flashcards/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deck_id, question, answer, question_image, answer_image })
    })

    if (res.ok) {
        dispatch(getClasses())
        dispatch(getDeck(deck_id))
    }
}

export const putFlashcard = (question, answer, question_image, answer_image, deck_id, id) => async dispatch => {
    const res = await fetch(`/api/flashcards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deck_id, question, answer, question_image, answer_image })
    })

    if (res.ok) {
        dispatch(getClasses())
        dispatch(getDeck(deck_id))
    }
}

export const deleteFlashcard = (deck_id, id) => async dispatch => {
    const res = await fetch(`/api/flashcards/${id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(getClasses())
        dispatch(getDeck(deck_id))
    }
}

// -Reducer--------------------
const initialState = { allDecks: {}, singleDeck: {}, flashcards: {} }

const DeckReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_DECKS:
            action.decks.forEach(deck => {
                newState.allDecks[deck.id] = deck
            })
            return newState;
        case GET_DECK:
            newState.singleDeck = action.deck
            newState.flashcards = action.deck?.flashcards
            return newState;
        case POST_DECK:
            newState.allDecks[action.deck.id] = action.deck
            return newState
        case PUT_DECK:
            newState.allDecks[action.deck.id] = action.deck
            return newState
        case DELETE_DECK:
            delete newState.allDecks[action.id]
            return newState
        case POST_FLASHCARD:
            newState.allDecks[action.deck_id].flashcards.push(action.flashcard)
            newState.singleDeck.flashcards.push(action.flashcard)
            return newState
        case PUT_FLASHCARD:
            const putUpdated = newState.allDecks[action.deck_id].flashcards.filter(card => card.id !== action.flashcard.id)
            putUpdated.push(action.flashcard)
            newState.allDecks[action.deck_id].flashcards = putUpdated
            newState.singleDeck.flashcards = putUpdated
            return newState
        case DELETE_FLASHCARD:
            const deleteUpdated = newState.allDecks[action.deck_id].flashcards.filter(card => card.id !== action.flashcard.id)
            newState.allDecks[action.deck_id].flashcards = deleteUpdated
            newState.singleDeck[action.deck_id].flashcards = deleteUpdated
            return newState
        default:
            return state
    }
}

export default DeckReducer
