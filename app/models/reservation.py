from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Reservation(db.Model):
    __tablename__ = 'reservations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.Time, nullable=False)
    date = db.Column(db.Date, nullable=False)
    guest_count = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    #Relationships
    user = db.relationship("User", back_populates="reservations")
    restaurant = db.relationship("Restaurant", back_populates="reservations")

    def to_dict(self):
        return {
            'id': self.id,
            'time': self.time,
            'date': self.date,
            'guest_count': self.guest_count,
            'restaurant': self.restaurant.to_dict(),
            'user': self.user.to_dict()
        }
