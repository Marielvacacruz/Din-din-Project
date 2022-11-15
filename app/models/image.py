from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(250), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)

    #Relationships
    restaurant = db.relationship("Restaurant", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'restaurant_id': self.restaurant_id
        }
