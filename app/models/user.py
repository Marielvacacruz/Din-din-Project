from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(30),  nullable=False,)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan", lazy="joined")
    reservations = db.relationship("Reservation", back_populates='user', cascade="all, delete-orphan", lazy="joined")
    favorites = db.relationship("Favorite", back_populates="user", cascade="all, delete-orphan", lazy="joined")
    restaurants = db.relationship("Restaurant", back_populates='owner', lazy="joined")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone_number': self.phone_number
        }
