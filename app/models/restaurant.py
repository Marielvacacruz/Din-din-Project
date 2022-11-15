from .db import db, environment, SCHEMA, add_prefix_for_prod

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    type = db.Column(db.String(20), nullable=False)
    url_slug = db.Column(db.String(150), nullable=False, unique=True)
    rating = db.Column(db.Float(precision=2))
    price_range = db.Column(db.String(5), nullable=False)
    about = db.Column(db.Text(), nullable=False)
    phone_num = db.Column(db.String(12), nullable=False)
    website_url = db.Column(db.String(200))
    address_line = db.Column(db.String(90), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.String(5), nullable=False)
    open_time = db.Column(db.Time, nullable=False)
    closing_time = db.Column(db.Time, nullable=False)
    preview_img_url = db.Column(db.String(250))

    #Relationships
    owner = db.relationship("User", lazy="joined")
