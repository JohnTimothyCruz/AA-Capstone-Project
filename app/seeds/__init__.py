from flask.cli import AppGroup
from .users import seed_users, undo_users
from .classes import seed_classes, undo_classes
from .decks import seed_decks, undo_decks
from .flashcards import seed_flashcards, undo_flashcards
from .learners import seed_learners, undo_learners
from .studied_cards import seed_studied_cards, undo_studied_cards
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.classes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.flashcards RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.learners RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.studied_cards RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_studied_cards()
        undo_learners()
        undo_flashcards()
        undo_decks()
        undo_classes()
        undo_users()
    seed_users()
    seed_classes()
    seed_decks()
    seed_flashcards()
    seed_learners()
    seed_studied_cards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_studied_cards()
    undo_learners()
    undo_flashcards()
    undo_decks()
    undo_classes()
    undo_users()
    # Add other undo functions here
