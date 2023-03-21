from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        first_name = 'De',
        last_name = 'mo',
        email='demo@aa.io',
        password='password'
    )
    user2 = User(
        username='Marnie Anderson',
        first_name = 'Marnie',
        last_name = 'Anderson',
        email='marnie@aa.io',
        password='password'
    )
    user3 = User(
        username='Ron Wen',
        first_name = 'Ron',
        last_name = 'Wen',
        email='wen@aa.io',
        password='password'
    )
    user4 = User(
        username='Rachael Glaser',
        first_name = 'Rachael',
        last_name = 'Glaser',
        email='rachie@aa.io',
        password='password'
    )
    user5 = User(
        username='Louis Lou',
        first_name = 'Louis',
        last_name = 'Lou',
        email='louis@aa.io',
        password='password'
    )
    user6 = User(
        username='Gilbert Sully',
        first_name = 'Gilbert',
        last_name = 'Sully',
        email='gilbert@aa.io',
        password='password'
    )
    user7 = User(
        username='Jackson Brow',
        first_name = 'Jackson',
        last_name = 'Brow',
        email='jackson@aa.io',
        password='password'
    )
    user8 = User(
        username='Donnie Sully',
        first_name = 'Donnie',
        last_name = 'Sully',
        email='donnie@aa.io',
        password='password'
    )
    user9 = User(
        username='Tom Smith',
        first_name = 'Tom',
        last_name = 'Smith',
        email='tom@aa.io',
        password='password'
    )
    user10 = User(
        username='Philip Phelps',
        first_name = 'Philip',
        last_name = 'Phelps',
        email='philip@aa.io',
        password='password'
    )
    user11 = User(
        username='Bob Daniel',
        first_name = 'Bob',
        last_name = 'Daniel',
        email='bobbie@aa.io',
        password='password'
    )
    user12 = User(
        username='Alice Gunn',
        first_name = 'Alice',
        last_name = 'Gunn',
        email='alice@aa.io',
        password='password'
    )
    user13 = User(
        username='Hanna Nelly',
        first_name = 'Hanna',
        last_name = 'Nelly',
        email='hanna@aa.io',
        password='password'
    )
    user14 = User(
        username='Ann Woodle',
        first_name = 'Ann',
        last_name = 'Woodle',
        email='ann@aa.io',
        password='password'
    )
    user15 = User(
        username='John Doe',
        first_name = 'John',
        last_name = 'Doe',
        email='john@aa.io',
        password='password'
    )

    users = [
        demo, user2, user3, user4, user5,
        user6, user7, user8, user9, user10,
        user11, user12, user13, user14, user15
    ]

    add_users = [db.session.add(user) for user in users]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
