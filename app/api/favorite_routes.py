from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Favorite

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('/', methods=['GET'])
@login_required
def get_users_favorites():
    """
    Returns a list of user's favorite restaurants
    """

    faveList = Favorite.query.filter(Favorite.user_id == current_user.id)

    favorites = [fave.to_dict() for fave in faveList.all()]

    return jsonify({
        'user_id': current_user.id,
        'restaurant_ids': [fav['restaurant_id'] for fav in favorites]}), 200


@favorite_routes.route('/', methods=['POST'])
@login_required
def add_favorite():
    """
    Adds a restaurant to a user's list of favorites
    """

    body = request.get_json()

    query = Favorite.query.filter(Favorite.user_id == current_user.id)
    favorites = [fav.to_dict() for fav in query.all()]

    if body['restaurant_id'] in [fave['restaurant_id'] for fave in favorites]:
        return jsonify({
            "message": 'Restaurant already added to favorites'
            }), 409

    new_favorite = Favorite(
        user_id = current_user.id,
        restaurant_id = body['restaurant_id']
    )
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({"id": new_favorite.id, "user_id": new_favorite.user_id, "restaurant_id": new_favorite.restaurant_id}), 200


@favorite_routes.route('/<int:restaurant_id>', methods=['DELETE'])
@login_required
def remove_favorite(restaurant_id):
    """
    Removes restaurant from user's favorite list
    """
    data = Favorite.query.filter(Favorite.user_id == current_user.id).filter(Favorite.restaurant_id == restaurant_id).first()

    if data is None:
        return jsonify({"message": 'Restaurant is not part of list'})
    db.session.delete(data)
    db.session.commit()
    return jsonify({
        "message": 'successfully removed restaurant from favorites',
        "status_code": 200
        }), 200
