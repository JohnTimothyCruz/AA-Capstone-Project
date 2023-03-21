from app.models import db, Learner, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_learners():
    learner1 = Learner(
        user_id = 2,
        class_id = 3,
        mastery = 0,
        days_studied = 1,
        time_studied = 4,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner2 = Learner(
        user_id = 3,
        class_id = 2,
        mastery = 0,
        days_studied = 1,
        time_studied = 0,
        cards_studied = 0,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner3 = Learner(
        user_id = 4,
        class_id = 5,
        mastery = 100,
        days_studied = 1,
        time_studied = 1,
        cards_studied = 2,
        permission = "Preview",
        createdAt = datetime.now()
    )
    learner4 = Learner(
        user_id = 5,
        class_id = 6,
        mastery = 50,
        days_studied = 1,
        time_studied = 5,
        cards_studied = 1,
        permission = "Edit",
        createdAt = datetime.now()
    )
    learner5 = Learner(
        user_id = 7,
        class_id = 8,
        mastery = 50,
        days_studied = 1,
        time_studied = 3,
        cards_studied = 1,
        permission = "Admin",
        createdAt = datetime.now()
    )
    learner6 = Learner(
        user_id = 8,
        class_id = 9,
        mastery = 100,
        days_studied = 1,
        time_studied = 4,
        cards_studied = 2,
        permission = "Preview",
        createdAt = datetime.now()
    )
    learner7 = Learner(
        user_id = 9,
        class_id = 10,
        mastery = 100,
        days_studied = 1,
        time_studied = 1,
        cards_studied = 2,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner8 = Learner(
        user_id = 10,
        class_id = 11,
        mastery = 0,
        days_studied = 1,
        time_studied = 2,
        cards_studied = 0,
        permission = "Edit",
        createdAt = datetime.now()
    )
    learner9 = Learner(
        user_id = 11,
        class_id = 13,
        mastery = 50,
        days_studied = 1,
        time_studied = 5,
        cards_studied = 1,
        permission = "Full Study",
        createdAt = datetime.now()
    )
    learner10 = Learner(
        user_id = 12,
        class_id = 12,
        mastery = 100,
        days_studied = 1,
        time_studied = 8,
        cards_studied = 2,
        permission = "Full Study",
        createdAt = datetime.now()
    )


    learners = [
        learner1, learner2, learner3, learner4, learner5,
        learner6, learner7, learner8, learner9, learner10
    ]

    add_learners = [db.session.add(learner) for learner in learners]

    db.session.commit()


def undo_classes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.learners RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM learners"))

    db.session.commit()
