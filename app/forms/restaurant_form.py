from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField, TimeField
from wtforms.validators import DataRequired, ValidationError, Length

class RestaurantForm(FlaskForm):
    
