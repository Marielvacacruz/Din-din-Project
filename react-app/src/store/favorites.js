//constants
const SET_FAVORITES = "SET_FAVORITES";
const ADD_FAVORITE = "ADD_FAVORITE";
const DELETE_FAVORITE = "DELETE_FAVORITE";

//action creators
const setUserFavorites = (userId, restaurantIds, restaurants) => {
    return {
      type: SET_FAVORITES,
      userId,
      restaurantIds,
      restaurants
    };
  };


const addFavorite = (userId, restaurantId) => {
    return {
        type: ADD_FAVORITE,
        userId,
        restaurantId
    };
};

const removeFavorite = (userId, restaurantId) => {
    return {
        type: DELETE_FAVORITE,
        userId,
        restaurantId
    };
};

//thunks

//fetch favorites
export const fetchFavorites = () => async (dispatch, getState) => {
    const user = getState().session.user;

    if(!user) return;

    const res = await fetch('/api/favorites/');

    if (res.ok) {
      const data = await res.json();
      dispatch(setUserFavorites(data.user_id, data.restaurant_ids, data.restaurants));
    }
    return res;
  };


  //add to favorites
  export const addToFavorites = (restaurantId) => async (dispatch, getState) => {
    const state = getState();

    if (!state.session.user) return;

    //if restaurant is already on list
    if (state.favorites[state.session.user.id]?.includes(restaurantId)) return;

    const res = await fetch('/api/favorites/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            restaurant_id: restaurantId,
        }),
    });

    if(res.ok){
        dispatch(addFavorite(state.session.user.id, restaurantId));
    }

  };

  //remove from favorites
  export const removeFromFavorites = (userId, restaurantId) => async (dispatch) => {
    const res = await fetch(`/api/favorites/${restaurantId}`, {
        method: "DELETE",
    });

    if(res.ok){
        dispatch(removeFavorite(userId, restaurantId));
    }
  };

  export default function favoritesReducer(state = {}, action) {
    const newState  = {...state};
    newState.details = {...state.details}
    const {restaurantId, restaurantIds, userId, restaurants} = action;

    switch (action.type) {
        case SET_FAVORITES:
            const restaurant_details = {}
            newState[userId] = restaurantIds;
            restaurants.forEach((restaurant) => {
                        restaurant_details[restaurant.id] = restaurant
                    });
            newState.details =  restaurant_details
            break;
        case ADD_FAVORITE:
            newState[userId] = [...newState[userId], restaurantId];
            break;
        case DELETE_FAVORITE:
            delete newState[userId].restaurantId
            break;

        default:
        break;
    }
    return newState;
  }
