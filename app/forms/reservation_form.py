from flask_wtf import FlaskForm
import datetime
from wtforms import StringField, IntegerField, TimeField, DateField
from wtforms.validators import DataRequired, NumberRange, Length, ValidationError

def validate_date(form, field):
    """
    validate that day is not in the past
    """
    if field.data < datetime.data.today():
        raise ValidationError('Day must be current or in the future')

class ReservationForm(FlaskForm):
    time = TimeField('time', format='%H:%M:%S:', validators=[DataRequired()])
    date = DateField('date', format='%Y-%M-%D', validators=[DataRequired(), validate_date])
    guest_count = IntegerField('guest_count', validators=[DataRequired(), NumberRange(min=1)])
    restaurant_id = IntegerField('restaurant_id', validators=[DataRequired()])
