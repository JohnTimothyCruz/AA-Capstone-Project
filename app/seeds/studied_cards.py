from app.models import db, Studied_Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_studied_cards():
    studied1 = Studied_Card(
        learner_id = 3,
        flashcard_id = 12,
    )
    studied2 = Studied_Card(
        learner_id = 3,
        flashcard_id = 13,
    )
    studied3 = Studied_Card(
        learner_id = 4,
        flashcard_id = 14,
    )
    studied4 = Studied_Card(
        learner_id = 5,
        flashcard_id = 18,
    )
    studied5 = Studied_Card(
        learner_id = 6,
        flashcard_id = 20,
    )
    studied6 = Studied_Card(
        learner_id = 6,
        flashcard_id = 21,
    )
    studied7 = Studied_Card(
        learner_id = 7,
        flashcard_id = 24,
    )
    studied8 = Studied_Card(
        learner_id = 7,
        flashcard_id = 25,
    )
    studied9 = Studied_Card(
        learner_id = 9,
        flashcard_id = 30,
    )
    studied10 = Studied_Card(
        learner_id = 10,
        flashcard_id = 28,
    )
    studied11 = Studied_Card(
        learner_id = 10,
        flashcard_id = 29,
    )
    studied12 = Studied_Card(
        learner_id = 11,
        flashcard_id = 1,
    )
    studied13 = Studied_Card(
        learner_id = 11,
        flashcard_id = 2,
    )
    studied14 = Studied_Card(
        learner_id = 12,
        flashcard_id = 2,
    )
    studied15 = Studied_Card(
        learner_id = 12,
        flashcard_id = 3,
    )
    studied16 = Studied_Card(
        learner_id = 13,
        flashcard_id = 8,
    )
    studied17 = Studied_Card(
        learner_id = 13,
        flashcard_id = 9,
    )
    studied18 = Studied_Card(
        learner_id = 15,
        flashcard_id = 14,
    )
    studied19 = Studied_Card(
        learner_id = 15,
        flashcard_id = 15,
    )
    studied20 = Studied_Card(
        learner_id = 20,
        flashcard_id = 28,
    )
    studied21 = Studied_Card(
        learner_id = 20,
        flashcard_id = 29,
    )
    studied22 = Studied_Card(
        learner_id = 23,
        flashcard_id = 34,
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
