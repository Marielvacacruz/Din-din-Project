from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from ..models import Restaurant

def validate_restaurant(form, field):
    """
    checks if restaurant exists
    """
    restaurant_id = field.data
    restaurant = Restaurant.query.get(restaurant_id)

    if restaurant is None:
        raise ValidationError("Restaurant is not available")

class ReviewForm(FlaskForm):
    star_rating = IntegerField('star_rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    review = TextAreaField('review', validators=[DataRequired(), Length(max=500)])
    restaurant_id = IntegerField('restaurant_id', validators=[DataRequired(), validate_restaurant])
    submit = SubmitField('submit')
