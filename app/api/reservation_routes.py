from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import Reservation

reservation_routes = Blueprint('reservations', __name__)

@reservation_routes.route('/user')
@login_required
def get_user_reservations():
    """Gets current user's reservations"""
    reservations = [res.to_dict() for res in current_user.reservations]
    return jsonify({"reservations": reservations}), 200

#TODO:Create, Update and Delete reservation
