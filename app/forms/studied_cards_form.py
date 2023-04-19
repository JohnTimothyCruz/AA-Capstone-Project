from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class StudiedForm(FlaskForm):
    learner_id = IntegerField("User id", validators=[DataRequired()])
    flashcard_id = IntegerField("Flashcard id", validators=[DataRequired()])
    class_id = IntegerField("Class id", validators=[DataRequired()])
    deck_id = IntegerField("Deck id", validators=[DataRequired()])
