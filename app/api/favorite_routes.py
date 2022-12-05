from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Favorite

favorite_routes = Blueprint('favorites', __name__)

#TODO: complete favorite routes 
@favorite_routes('')
@login_required
def get_users_favorites():
    """
    Returns a list of user's favorite restaurants
    """

    faveList = Favorite.query.filter(Favorite.user_id == current_user.id)

    favorites = [fave.to_dict() for fave in faveList.all()]

    return jsonify({''})
