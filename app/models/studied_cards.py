from .db import db, environment, SCHEMA, add_prefix_for_prod


class Studied_Card(db.Model):
    __tablename__ = 'studied_cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    flashcard_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('flashcards.id')))
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "flashcard_id": self.flashcard_id,
            "class_id": self.class_id,
        }
