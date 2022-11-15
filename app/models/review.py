from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    star_rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    #relationships
    user = db.relationship("User", back_populates="reviews")
    restaurant = db.relationship("Restaurant", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'star_rating': self.star_rating,
            'review': self.review,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': {
                'id': self.user.id,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name
            },
            'restaurant': {
                'id':  self.restaurant.id,
                'name': self.restaurant.name,
                'url_slug': self.restaurant.url_slug,
            }
        }
