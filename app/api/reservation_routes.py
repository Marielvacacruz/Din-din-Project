from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import Reservation, db
from ..forms import ReservationForm
from ..api.auth_routes import validation_errors_to_error_messages

reservation_routes = Blueprint('reservations', __name__)

@reservation_routes.route('/user')
@login_required
def get_user_reservations():
    """Gets current user's reservations"""
    reservations = [res.to_dict() for res in current_user.reservations]
    return jsonify({"reservations": reservations}), 200


@reservation_routes.route('/', methods=['POST'])
@login_required
def create_reservation():
    """
    Creates a new reservation, must be logged in
    """
    form = ReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        reservation = Reservation(
            time = form.data['time'],
            date = form.data['date'],
            guest_count = form.data['guest_count'],
            user_id = current_user.id,
            restaurant_id = form.data['restaurant_id']
        )
        db.session.add(reservation)
        db.session.commit()

        return reservation.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)},400



#TODO:UPDATE

@reservation_routes.route('/<int:reservation_id>', methods=['DELETE'])
@login_required
def delete_reservation(reservation_id):
    """
    Deletes a reservation by reservation id
    Current user must own reservation
    """
    reservation = Reservation.query.get(reservation_id)

    if reservation is None:
        return jsonify({
            "message": 'Could not find reservation',
            "status_code": 404,
        }), 404

    if reservation.user_id != current_user.id:
        return jsonify({
            "message": 'Forbidden',
            "status_code": 403,
        }), 403

    db.session.delete(reservation)
    db.session.commit()

    return jsonify({
            "message": 'Successfully deleted reservation',
            "status_code": 200,
        }), 200
