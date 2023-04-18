from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class LearnerForm(FlaskForm):
    user_id = IntegerField("User id", validators=[DataRequired()])
    class_id = IntegerField("Class id", validators=[DataRequired()])
    days_studied = IntegerField("Days studied")
    time_studied = IntegerField("Time studied")
    permission = StringField("Permission")
