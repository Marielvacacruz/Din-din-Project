from flask import Blueprint, jsonify, request
from ..models import Restaurant

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

# Todo : Create and Delete Restaurant
