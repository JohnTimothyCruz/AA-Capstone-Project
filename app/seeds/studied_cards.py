from app.models import db, Studied_Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_studied_cards():
    studied1 = Studied_Card(
        user_id = 4,
        flashcard_id = 12,
        class_id = 5
    )
    studied2 = Studied_Card(
        user_id = 4,
        flashcard_id = 13,
        class_id = 5
    )
    studied3 = Studied_Card(
        user_id = 5,
        flashcard_id = 14,
        class_id = 6
    )
    studied4 = Studied_Card(
        user_id = 7,
        flashcard_id = 18,
        class_id = 8
    )
    studied5 = Studied_Card(
        user_id = 8,
        flashcard_id = 20,
        class_id = 9
    )
    studied6 = Studied_Card(
        user_id = 8,
        flashcard_id = 21,
        class_id = 9
    )
    studied7 = Studied_Card(
        user_id = 9,
        flashcard_id = 24,
        class_id = 10
    )
    studied8 = Studied_Card(
        user_id = 9,
        flashcard_id = 25,
        class_id = 10
    )
    studied9 = Studied_Card(
        user_id = 11,
        flashcard_id = 30,
        class_id = 13
    )
    studied10 = Studied_Card(
        user_id = 12,
        flashcard_id = 28,
        class_id = 12
    )
    studied11 = Studied_Card(
        user_id = 12,
        flashcard_id = 29,
        class_id = 12
    )
    studied12 = Studied_Card(
        user_id = 2,
        flashcard_id = 1,
        class_id = 1
    )
    studied13 = Studied_Card(
        user_id = 2,
        flashcard_id = 2,
        class_id = 1
    )
    studied14 = Studied_Card(
        user_id = 2,
        flashcard_id = 2,
        class_id = 2
    )
    studied15 = Studied_Card(
        user_id = 2,
        flashcard_id = 3,
        class_id = 2
    )
    studied16 = Studied_Card(
        user_id = 4,
        flashcard_id = 8,
        class_id = 3
    )
    studied17 = Studied_Card(
        user_id = 4,
        flashcard_id = 9,
        class_id = 3
    )
    studied18 = Studied_Card(
        user_id = 7,
        flashcard_id = 14,
        class_id = 6
    )
    studied19 = Studied_Card(
        user_id = 7,
        flashcard_id = 15,
        class_id = 6
    )
    studied20 = Studied_Card(
        user_id = 11,
        flashcard_id = 28,
        class_id = 12
    )
    studied21 = Studied_Card(
        user_id = 11,
        flashcard_id = 29,
        class_id = 12
    )
    studied22 = Studied_Card(
        user_id = 14,
        flashcard_id = 34,
        class_id = 15
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
