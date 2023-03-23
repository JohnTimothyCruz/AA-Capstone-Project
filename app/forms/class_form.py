from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class ClassForm(FlaskForm):
    user_id = IntegerField("User id", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    mix_type = StringField("Mix type")
    visibility = BooleanField("Visibility")
    image = StringField("Image")
    headline = StringField("Headline")
    description = StringField("Description")
