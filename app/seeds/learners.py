from app.models import db, Learner, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_learners():
    learner1 = Learner(
        user_id = 2,
        class_id = 10,
        days_studied = 1,
        time_studied = 4,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner2 = Learner(
        user_id = 3,
        class_id = 2,
        days_studied = 1,
        time_studied = 0,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner3 = Learner(
        user_id = 4,
        class_id = 5,
        days_studied = 1,
        time_studied = 1,
        cards_studied = 2,
        permission = "Preview",
        createdAt = datetime.now()
    )
    learner4 = Learner(
        user_id = 5,
        class_id = 6,
        days_studied = 1,
        time_studied = 5,
        cards_studied = 1,
        permission = "Edit",
        createdAt = datetime.now()
    )
    learner5 = Learner(
        user_id = 7,
        class_id = 8,
        days_studied = 1,
        time_studied = 3,
        cards_studied = 1,
        permission = "Admin",
        createdAt = datetime.now()
    )
    learner6 = Learner(
        user_id = 8,
        class_id = 9,
        days_studied = 1,
        time_studied = 4,
        cards_studied = 2,
        permission = "Preview",
        createdAt = datetime.now()
    )
    learner7 = Learner(
        user_id = 9,
        class_id = 10,
        days_studied = 1,
        time_studied = 1,
        cards_studied = 2,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner8 = Learner(
        user_id = 10,
        class_id = 11,
        days_studied = 1,
        time_studied = 2,
        cards_studied = 0,
        permission = "Edit",
        createdAt = datetime.now()
    )
    learner9 = Learner(
        user_id = 11,
        class_id = 13,
        days_studied = 1,
        time_studied = 5,
        cards_studied = 1,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner10 = Learner(
        user_id = 12,
        class_id = 12,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 2,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner11 = Learner(
        user_id = 2,
        class_id = 1,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 2,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner12 = Learner(
        user_id = 2,
        class_id = 2,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 2,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner13 = Learner(
        user_id = 4,
        class_id = 3,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 2,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner14 = Learner(
        user_id = 7,
        class_id = 5,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 2,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner15 = Learner(
        user_id = 7,
        class_id = 6,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 2,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner16 = Learner(
        user_id = 7,
        class_id = 7,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner17 = Learner(
        user_id = 8,
        class_id = 8,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner18 = Learner(
        user_id = 9,
        class_id = 9,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner19 = Learner(
        user_id = 11,
        class_id = 10,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner20 = Learner(
        user_id = 11,
        class_id = 12,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 5,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner21 = Learner(
        user_id = 12,
        class_id = 13,
        days_studied = 1,
        time_studied = 1,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner22 = Learner(
        user_id = 14,
        class_id = 14,
        days_studied = 0,
        time_studied = 0,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner23 = Learner(
        user_id = 14,
        class_id = 15,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 1,
        permission = "Full Study",
        createdAt = datetime.now()
    )

    learners = [
        learner1, learner2, learner3, learner4, learner5,
        learner6, learner7, learner8, learner9, learner10,
        learner11, learner12, learner13, learner14, learner15,
        learner16, learner17, learner18, learner19, learner20,
        learner21, learner22, learner23
    ]

    add_learners = [db.session.add(learner) for learner in learners]

    db.session.commit()


def undo_learners():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.learners RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM learners"))

    db.session.commit()
