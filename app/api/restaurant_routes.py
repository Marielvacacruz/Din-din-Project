from flask import Blueprint, jsonify, request
from ..models import Restaurant, db
from ..forms import RestaurantForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/<path:state>')
def get_restaurants_by_state(state):
    """
    GET restaurants by city
    """
    restaurants = Restaurant.query.filter(Restaurant.state == state).all()
    return jsonify({'restaurants':[restaurant.to_dict() for restaurant in restaurants]}), 200

# TODO: Testing
@restaurant_routes.route('/<path:restaurant_url>/details')
def get_restaurant_details(restaurant_url):
    """
    GET Restaurant details by url slug
    """
    restaurant = Restaurant.query.filter(Restaurant.url_slug == restaurant_url).first()

    if restaurant is None:
        return jsonify({
            "message": "Restaurant could not be found",
            "status_code": 404
            }), 404
    return restaurant.to_dict(), 200

#Create a Restaurant (NEEDS TESTING)
@restaurant_routes.route('/', methods=['POST'])
@login_required
def create_restaurant():
    """
    Creates a new restaurant
    User must be logged in
    """
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        restaurant = Restaurant(
            name = form.data['name'],
            owner_id = current_user.id,
            type = form.data['type'],
            url_slug = form.data['url_slug'],
            rating = 0,
            price_range = form.data['price_range'],
            about = form.data['about'],
            phone_num = form.data['phone_num'],
            website_url = form.data['website_url'] or 'website url coming soon',
            address_line = form.data['address_line'],
            city = form.data['city'],
            state = form.data['state'],
            zip_code = form.data['zip_code'],
            open_time = form.data['open_time'],
            closing_time = form.data['closing_time'],
            neighborhood = form.data['neighborhood'],
            preview_img_url = form.data['preview_img_url'] or 'preview image',
        )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.to_dict(), 201
    return {"errors":validation_errors_to_error_messages(form.errors)}, 400


# #Delete Restaurant(NEEDS TESTING)
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
