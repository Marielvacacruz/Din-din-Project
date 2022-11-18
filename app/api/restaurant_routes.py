from flask import Blueprint, jsonify, request
from ..models import Restaurant, db
from flask_login import login_required, current_user

restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/<path:city>')
def get_restaurants_by_city(city):
    """
    GET restaurants by city
    """
    restaurants = Restaurant.query.filter(Restaurant.city == city).all()
    return jsonify({'restaurants':[restaurant.to_dict() for restaurant in restaurants]}), 200


@restaurant_routes.route('/<path:url_slug>')
def get_restaurant_details(url_slug):
    """
    GET Single Restaurant by url slug
    """
    restaurant = Restaurant.query.filter(Restaurant.url_slug == url_slug).first()

    if restaurant is None:
        return jsonify({
            "message": "Restaurant could not be found",
            "status_code": 404
            }), 404
    return restaurant.to_dict(), 200

# Todo : Create Restaurant


# #Delete Restaurant
@restaurant_routes.route('/<int:restaurantId>', methods=['DELETE'])
@login_required
def delete_restaurant(restaurantId):
    """
    Delete a restaurant by id
    current_user must be owner
    """
    restaurant = Restaurant.query.get(restaurantId)
    #check if restaurant exists
    if restaurant is None:
        return jsonify({
            "message": "Restaurant does not exist",
            "status_code":  404
            }), 404

    #check if current user owns restaurant
    if restaurant.owner_id != current_user.id:
        return jsonify({
            "message": "Forbidden",
            "status_code":  403
            }), 403

    #delete restaurant
    db.session.delete(restaurant)
    db.session.commit()

    return jsonify({
            "message": "Successfully deleted restaurant",
            "status_code":  200
            }), 200
