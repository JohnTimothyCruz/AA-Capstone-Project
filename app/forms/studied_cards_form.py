from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class StudiedForm(FlaskForm):
    user_id = IntegerField("User id", validators=[DataRequired()])
    flashcard_id = IntegerField("Flashcard id", validators=[DataRequired()])
    class_id = IntegerField("Class id", validators=[DataRequired()])
