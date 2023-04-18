from .db import db, environment, SCHEMA, add_prefix_for_prod
from .classes import Class
from .user import User
from datetime import datetime


class Learner(db.Model):
    __tablename__ = 'learners'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')))
    mastery = db.Column(db.Integer, default=0)
    days_studied = db.Column(db.Integer, default=0)
    time_studied = db.Column(db.Integer, default=0)
    cards_studied = db.Column(db.Integer, default=0)
    permission = db.Column(db.String(11))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship(
        "User",
        back_populates="learning"
    )
    class_info = db.relationship(
        "Class",
        back_populates="learners"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "class_id": self.class_id,
            "mastery": self.mastery,
            "days_studied": self.days_studied,
            "time_studied": self.time_studied,
            "cards_studied": self.cards_studied,
            "permission": self.permission,
            "createdAt": self.createdAt,
            "user": self.user.to_dict(),
            "class_info": self.class_info.to_dict()
        }

    def to_dict_no_loop(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "class_id": self.class_id,
            "mastery": self.mastery,
            "days_studied": self.days_studied,
            "time_studied": self.time_studied,
            "cards_studied": self.cards_studied,
            "permission": self.permission,
            "createdAt": self.createdAt,
            "user": self.user.to_dict_no_loop(),
            "class_info": self.class_info.to_dict_no_loop(),
        }
