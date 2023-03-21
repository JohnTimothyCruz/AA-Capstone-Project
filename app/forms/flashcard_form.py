from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class FlashcardForm(FlaskForm):
    deck_id = IntegerField("Deck id", validators=[DataRequired()])
    question = StringField("Question", validators=[DataRequired()])
    answer = StringField("Answer", validators=[DataRequired()])
    question_image = StringField("Question image")
    answer_image = StringField("Answer image")
