from .db import db, environment, SCHEMA, add_prefix_for_prod


class Studied_Card(db.Model):
    __tablename__ = 'studied_cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    learner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('learners.id')))
    flashcard_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('flashcards.id')))

    learner = db.relationship(
        "Learner",
        back_populates="studied_cards"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "learner_id": self.learner_id,
            "flashcard_id": self.flashcard_id
        }
