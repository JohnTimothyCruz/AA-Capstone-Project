from .db import db, environment, SCHEMA, add_prefix_for_prod
from .decks import Deck


class Flashcard(db.Model):
    __tablename__ = "flashcards"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')))
    question = db.Column(db.String(250), nullable=False)
    answer = db.Column(db.String(250), nullable=False)
    question_image = db.Column(db.String)
    answer_image = db.Column(db.String)

    deck = db.relationship(
        "Deck",
        back_populates="flashcards"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'deck_id': self.deck_id,
            'question': self.question,
            'answer': self.answer,
            'question_image': self.question_image,
            'answer_image': self.answer_image,
            'deck': self.deck
        }

    def to_dict_no_loop(self):
        return {
            'id': self.id,
            'deck_id': self.deck_id,
            'question': self.question,
            'answer': self.answer,
            'question_image': self.question_image,
            'answer_image': self.answer_image
        }
