//constants
const SET_RESTAURANT_REVIEWS = 'SET_RESTAURANT_REVIEWS'
const SET_USER_REVIEWS = 'SET_USER_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'
const EDIT_REVIEW = 'EDIT_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

//action creators
const setRestaurantReviews = (reviews) => {
    return{
        type: SET_RESTAURANT_REVIEWS,
        reviews,
    };
}

const setUserReviews = (reviews) => {
    return {
        type: SET_USER_REVIEWS,
        reviews,
    };
}

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
}

const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}


//thunks

//get all restaurant reviews
export const getRestaurantReviews = (restaurantId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${restaurantId}`);

    if(res.ok){
        const data = await res.json();
        dispatch(setRestaurantReviews(data.reviews));
    }
    return res;
};

//get all user reviews
export const getUserReviews = () => async (dispatch) => {
    const res = await fetch(`/api/reviews/user`);

    if(res.ok){
        const data = await res.json();
        dispatch(setUserReviews(data.reviews));
    }
    return res;
};


//Add new Review
export const createReview = (review_data) => async(dispatch) => {
    const {
        star_rating,
        review,
        restaurant_id,
    } = review_data

    const res = await fetch(`/api/reviews/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          restaurant_id,
          star_rating,
          review
        }),
    });
    const data = await res.json();
    dispatch(addReview(data));
    return res;
};

//Edit a Review
export const updateReview = (review, id) => async(dispatch) => {

    const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          review
        }),
    });
    const data = await res.json();
    dispatch(editReview(data));
    return res;

};

//DELETE Review
export const destroyReview = (reviewId) => async(dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    const response = await res.json();
    if(res.status === 200){
        dispatch(deleteReview(reviewId));
    }
    return response;
};


//Reducer
export default function reviewReducer(state = {}, action){
    let newState = {...state};
    newState.user = {...state.user};
    newState.restaurant = {...state.restaurant};

    switch(action.type){
        case SET_RESTAURANT_REVIEWS:
            const resReviews = {};
            action.reviews.forEach((review) => {
                resReviews[review.id] = review;
            });
            newState.restaurant = resReviews;
            break;

        case SET_USER_REVIEWS:
            const reviews = {};
            action.reviews.forEach((review) => {reviews[review.id] = reviews});
            newState.user = reviews;
            break;

        case ADD_REVIEW:
            newState.new = action.review;
            break;

        case EDIT_REVIEW:
            newState.edit = action.review;
            break;

        case DELETE_REVIEW:
            delete newState.user[action.reviewId];
            break;

        default:
            break;
    }
    return newState;
};
