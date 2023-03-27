from .db import db, environment, SCHEMA, add_prefix_for_prod


class Class(db.Model):
    __tablename__ = "classes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(250), nullable=False)
    mix_type = db.Column(db.String, nullable=False, default="progressive")
    visibility = db.Column(db.String, nullable=False, default="public")
    image = db.Column(db.String, default="https://www.brainscape.com/assets/app_icons/ugs.png")
    headline = db.Column(db.String(250))
    description = db.Column(db.String(500))

    user = db.relationship(
        "User",
        back_populates="classes"
    )
    learners = db.relationship(
        "Learner",
        back_populates="class_info"
    )
    decks = db.relationship(
        "Deck",
        back_populates="class_info"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'mix_type': self.mix_type,
            'visibility': self.visibility,
            'image': self.image,
            'headline': self.headline,
            'description': self.description,
            'user': self.user.to_dict_no_loop(),
            'learners': [learner.to_dict_no_loop() for learner in self.learners],
            'decks': [deck.to_dict_no_loop() for deck in self.decks]
        }

    def to_dict_no_loop(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'mix_type': self.mix_type,
            'visibility': self.visibility,
            'image': self.image,
            'headline': self.headline,
            'description': self.description
        }
