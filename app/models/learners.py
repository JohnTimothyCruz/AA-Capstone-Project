from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Learner(db.Model):
    __tablename__ = 'learners'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')))
    last_studied = db.Column(db.DateTime, default=datetime.now())
    days_studied = db.Column(db.Integer, default=0)
    time_studied = db.Column(db.Integer, default=0)
    cards_studied = db.Column(db.Integer, default=0)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship(
        "User",
        back_populates="learning"
    )
    class_info = db.relationship(
        "Class",
        back_populates="learners"
    )
    studied_cards = db.relationship(
        "Studied_Card",
        back_populates="learner"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "class_id": self.class_id,
            "last_studied": self.last_studied,
            "days_studied": self.days_studied,
            "time_studied": self.time_studied,
            "cards_studied": self.cards_studied,
            "createdAt": self.createdAt,
            "user": self.user.to_dict(),
            "class_info": self.class_info.to_dict(),
            "studied_cards": [card.to_dict() for card in self.studied_cards]
        }

    def to_dict_no_loop(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "class_id": self.class_id,
            "last_studied": self.last_studied,
            "days_studied": self.days_studied,
            "time_studied": self.time_studied,
            "cards_studied": self.cards_studied,
            "createdAt": self.createdAt,
            "user": self.user.to_dict_no_loop(),
            "class_info": self.class_info.to_dict_no_loop(),
            "studied_cards": [card.to_dict() for card in self.studied_cards]
        }
