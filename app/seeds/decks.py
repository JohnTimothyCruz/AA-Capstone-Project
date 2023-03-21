from app.models import db, Deck, environment, SCHEMA
from sqlalchemy.sql import text


def seed_decks():
    deck1 = Deck(
        class_id = 1,
        name = 'Unit 1, part 1 questions',
    )
    deck2 = Deck(
        class_id = 1,
        name = 'Unit 1, part 2 questions',
    )
    deck3 = Deck(
        class_id = 2,
        name = 'Unit 2, part 1 questions',
    )
    deck4 = Deck(
        class_id = 2,
        name = 'Unit 2, part 2 questions',
    )
    deck5 = Deck(
        class_id = 3,
        name = 'Industrial Revolution Flashcards',
        objective = 'Rewire those neurons you made during highschool history!'
    )
    deck6 = Deck(
        class_id = 4,
        name = 'Aerodynamics vocabulary flashcards',
    )
    deck7 = Deck(
        class_id = 5,
        name = 'Addition Flashcards',
        objective = 'Become comfortable adding numbers 0 - 9'
    )
    deck8 = Deck(
        class_id = 6,
        name = 'Subtraction Flashcards',
        objective = 'Become comfortable subtracting numbers 0 - 9'
    )
    deck9 = Deck(
        class_id = 7,
        name = 'Multiplication Flashcards',
        objective = 'Become comfortable multiplying numbers 0 - 9'
    )
    deck10 = Deck(
        class_id = 8,
        name = 'Basic Shapes Cards',
        objective = 'Be able to identify shapes.'
    )
    deck11 = Deck(
        class_id = 9,
        name = 'Vocab Cards',
    )
    deck12 = Deck(
        class_id = 9,
        name = 'Event Cards',
    )
    deck13 = Deck(
        class_id = 10,
        name = 'Landmarks',
    )
    deck14 = Deck(
        class_id = 11,
        name = 'Artists',
    )
    deck15 = Deck(
        class_id = 12,
        name = 'Trig cards for test',
        objective = 'asgdfbfsrthaerbdaf'
    )
    deck16 = Deck(
        class_id = 13,
        name = 'Last Names',
    )
    deck17 = Deck(
        class_id = 14,
        name = 'National Dishes',
    )
    deck18 = Deck(
        class_id = 15,
        name = 'Vocabulary',
        objective = 'Memorize important vocab for the the unit test.'
    )
    deck19 = Deck(
        class_id = 15,
        name = 'Atoms',
        objective = 'Be able to identify each part of an atom.'
    )
    deck20 = Deck(
        class_id = 15,
        name = 'Elements',
        objective = 'Be able to identify elements based on their properties.'
    )

    decks = [
        deck1, deck2, deck3, deck4, deck5,
        deck6, deck7, deck8, deck9, deck10,
        deck11, deck12, deck13, deck14, deck15,
        deck16, deck17, deck18, deck19, deck20
    ]

    add_decks = [db.session.add(deck) for deck in decks]

    db.session.commit()


def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM decks"))

    db.session.commit()
