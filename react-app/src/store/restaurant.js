//constants
const SET_RESTAURANTS = 'SET_RESTAURANT'
const SET_RESTAURANT = 'SET_RESTAURANT'
const ADD_RESTAURANT = 'ADD_RESTAURANT'
const DELETE_RESTAURANT = 'DELETE_RESTAURANT'

//action creators
const setRestaurants = (restaurants) => {
    return{
        type: SET_RESTAURANTS,
        restaurants,
    };
}

const setRestaurant = (restaurant) => {
    return {
        type: SET_RESTAURANT,
        restaurant
    };
}

const addRestaurant = (restaurant) => {
    return {
        type: ADD_RESTAURANT,
        restaurant
    };
}

const removeRestaurant = (restaurantId) => {
    return {
        type: DELETE_RESTAURANT,
        restaurantId
    }
}

//thunks

//get all restaurants by city
export const getRestaurantsByCity = (city) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${city}`);

    if(res.ok){
        const data = await res.json();
        dispatch(setRestaurants(data.restaurants));
    }
    return res;
};

//get details of a res by url slug
export const getRestaurant = (restaurant_url) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${restaurant_url}`);

    if(res.ok){
        const data = await res.json();
        dispatch(setRestaurant(data));
    }
    return res;
};

//TODO: ADD AND DELETE THUNK

//Reducer
export default function restaurantReducer(state = {restaurants: {}, urls: {}}, action){
    let newState = {...state};
    switch(action.type){
        case SET_RESTAURANTS:
            action.restaurants.forEach((restaurant) => {
                newState.restaurants[restaurant.id] = restaurant;
                newState.urls[restaurant.url_slug] = restaurant.id;
            });
            break;

        case SET_RESTAURANT:
            newState.restaurants[action.restaurant.id] = action.restaurant;
            newState.urls[action.restaurant.url_slug] = action.restaurant.id;
            break;

        case ADD_RESTAURANT:
            newState.restaurants[action.restaurant.id] = action.restaurant;
            newState.urls[action.restaurant.url_slug] = action.restaurant.id;
            break;

        case DELETE_RESTAURANT:
            delete newState.restaurants[action.restaurantId];
            for(let url in newState.urls)
                if (newState.urls[url_slug] === action.restaurantId)
                    delete newState.urls[url_slug];
            break;
            
        default:
            break;
    }
    return newState;
};
