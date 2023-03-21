from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class DeckForm(FlaskForm):
    class_id = IntegerField("Class id", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
