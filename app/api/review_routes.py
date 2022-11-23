from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import Review, db, Restaurant
from .auth_routes import validation_errors_to_error_messages
from ..forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes('/user')
@login_required
def user_reviews():
    """
    Returns a list of reviews owned by current user
    """
    reviews = [rev.to_dict() for rev in current_user.reviews]
    return jsonify({'reviews': reviews}), 200


@review_routes.route('/<int:restaurantId>')
def restaurant_reviews(restaurantId):
    """
    Gets all reviews belonging to a restaurant
    """
    restaurant = Restaurant.query.filter(Restaurant.id == restaurantId).first()

    if restaurant is None:
        return jsonify({"message": 'Restaurant does not exist', "status_code": '404'}), 404


@review_routes.route('/', methods=['POST'])
@login_required
def create_review():
    """
    Creates a new review
    User must be signed in
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            star_rating = form.data['star_rating'],
            review = form.data['review'],
            restaurant_id = form.data['restaurant_id'],
            user_id = current_user.id
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    """
    Updates an existing review
    Current user must be owner
    """
    updated_review = Review.query.get(review_id)

    if updated_review is None:
        return jsonify({"message": 'Review does not exists', "status_code": 404}), 404

    if updated_review.user_id != current_user.id:
        return jsonify({"message": 'Forbidden', "status_code": 403}), 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        updated_review.star_rating = form.data['star_rating'] or update_review.star_rating,
        updated_review.review = form.data['review'] or update_review.review,
        db.session.commit()
        return update_review.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """
    Deletes a review by id
    Current user must be owner of review_id
    """
    review = Review.query.get(review_id)

    if review is None:
        return jsonify({
            "message": 'Review does not exist',
            "status_code": 404,
        }), 404

    if review.user_id != current_user.id:
        return jsonify({
            "message": 'Forbidden',
            "status_code": 403,
        }), 403

    db.session.delete(review)
    db.session.commit()

    return jsonify({
            "message": 'Successfully deleted review',
            "status_code": 200,
        }), 200
