from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, TimeField
from wtforms.validators import DataRequired, Length


class RestaurantForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=50)]),
    type = StringField('type', validators=[DataRequired(), Length(max=20)]),
    url_slug = StringField('url_slug', validators=[DataRequired(), Length(max=150)]),
    price_range = StringField('price_range',validators=[DataRequired(), Length(max=5)]),
    about = TextAreaField('about', validators=[DataRequired(), Length(max=800)]),
    phone_num = StringField('phone_num', validators=[DataRequired(), Length(max=12)]),
    website_url = StringField('website_url', validators=[Length(max=200)]),
    address_line = StringField('address_line', validators=[DataRequired(), Length(max=90)]),
    city = StringField('city', validators=[DataRequired(), Length(max=50)]),
    state = StringField('state', validators=[DataRequired(), Length(max=30)]),
    zip_code = StringField('zip_cod', validators=[DataRequired(), Length(max=5)]),
    open_time = TimeField('open_time', validators=[DataRequired()]),
    closing_time = TimeField('closing_time', validators=[DataRequired()]),
    neighborhood = StringField('neighborhood', validators=[DataRequired(), Length(max=250)]),
    preview_img_url = StringField('preview_img_url', validators=[Length(max=250)])
