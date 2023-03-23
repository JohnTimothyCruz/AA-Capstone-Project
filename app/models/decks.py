from .db import db, environment, SCHEMA, add_prefix_for_prod
from .classes import Class


class Deck(db.Model):
    __tablename__ = "decks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')))
    name = db.Column(db.String(250))
    objective = db.Column(db.String(500))

    class_info = db.relationship(
        "Class",
        back_populates="decks"
    )
    flashcards = db.relationship(
        "Flashcard",
        back_populates="deck"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'class_id': self.class_id,
            'name': self.name,
            'objective': self.objective,
            'class_info': self.class_info,
            'flashcards': [flashcard.to_dict_no_loop() for flashcard in self.flashcards]
        }

    def to_dict_no_loop(self):
        return {
            'id': self.id,
            'class_id': self.class_id,
            'name': self.name,
            'objective': self.objective,
            'flashcards': [flashcard.to_dict_no_loop() for flashcard in self.flashcards]
        }
