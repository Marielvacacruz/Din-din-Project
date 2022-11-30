from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError


class EditReviewForm(FlaskForm):
    star_rating = IntegerField('star_rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    review = TextAreaField('review', validators=[DataRequired(), Length(max=500)])
