from app.models import db, Studied_Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_studied_cards():
    studied1 = Studied_Card(
        learner_id = 3,
        flashcard_id = 12,
        deck_id = 7,
        class_id = 5,
    )
    studied2 = Studied_Card(
        learner_id = 3,
        flashcard_id = 13,
        deck_id = 7,
        class_id = 5,
    )
    studied3 = Studied_Card(
        learner_id = 4,
        flashcard_id = 14,
        deck_id = 8,
        class_id = 6,
    )
    studied4 = Studied_Card(
        learner_id = 5,
        flashcard_id = 18,
        deck_id = 10,
        class_id = 8,
    )
    studied5 = Studied_Card(
        learner_id = 6,
        flashcard_id = 20,
        deck_id = 11,
        class_id = 9,
    )
    studied6 = Studied_Card(
        learner_id = 6,
        flashcard_id = 21,
        deck_id = 11,
        class_id = 9,
    )
    studied7 = Studied_Card(
        learner_id = 7,
        flashcard_id = 24,
        deck_id = 13,
        class_id = 10,
    )
    studied8 = Studied_Card(
        learner_id = 7,
        flashcard_id = 25,
        deck_id = 13,
        class_id = 10,
    )
    studied9 = Studied_Card(
        learner_id = 9,
        flashcard_id = 30,
        deck_id = 16,
        class_id = 13,
    )
    studied10 = Studied_Card(
        learner_id = 10,
        flashcard_id = 28,
        deck_id = 000,
        class_id = 000,
    )
    studied11 = Studied_Card(
        learner_id = 10,
        flashcard_id = 29,
        deck_id = 15,
        class_id = 12,
    )
    studied12 = Studied_Card(
        learner_id = 11,
        flashcard_id = 1,
        deck_id = 000,
        class_id = 000,
    )
    studied13 = Studied_Card(
        learner_id = 11,
        flashcard_id = 2,
        deck_id = 1,
        class_id = 1,
    )
    studied14 = Studied_Card(
        learner_id = 12,
        flashcard_id = 2,
        deck_id = 2,
        class_id = 1,
    )
    studied15 = Studied_Card(
        learner_id = 12,
        flashcard_id = 3,
        deck_id = 2,
        class_id = 1,
    )
    studied16 = Studied_Card(
        learner_id = 13,
        flashcard_id = 8,
        deck_id = 000,
        class_id = 000,
    )
    studied17 = Studied_Card(
        learner_id = 13,
        flashcard_id = 9,
        deck_id = 5,
        class_id = 3,
    )
    studied18 = Studied_Card(
        learner_id = 15,
        flashcard_id = 14,
        deck_id = 8,
        class_id = 6,
    )
    studied19 = Studied_Card(
        learner_id = 15,
        flashcard_id = 15,
        deck_id = 8,
        class_id = 6,
    )
    studied20 = Studied_Card(
        learner_id = 20,
        flashcard_id = 28,
        deck_id = 15,
        class_id = 12,
    )
    studied21 = Studied_Card(
        learner_id = 20,
        flashcard_id = 29,
        deck_id = 15,
        class_id = 12,
    )
    studied22 = Studied_Card(
        learner_id = 23,
        flashcard_id = 34,
        deck_id = 18,
        class_id = 15,
    )

    studied_cards = [
        studied1, studied2, studied3, studied4, studied5,
        studied6, studied7, studied8, studied9, studied10,
        studied11, studied12, studied13, studied14, studied15,
        studied16, studied17, studied18, studied19, studied20,
        studied21, studied22
    ]

    add_studied = [db.session.add(card) for card in studied_cards]

    db.session.commit()

def undo_studied_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.studied_cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM studied_cards"))

    db.session.commit()
