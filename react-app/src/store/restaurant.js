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
    const res = await csrfFetch(`/api/restaurants/${city}`);

    if(res.ok){
        const data = await res.json();
        dispatch(setRestaurants(data.restaurants));
    }
    return res;
};

//get details of a res by url slug
export const getRestaurant = (restaurantId) => async (dispatch) => {
    const res = await csrfFetch(`/api/restaurants/${city}`);

    if(res.ok){
        const data = await res.json();
        dispatch(setRestaurants(data.restaurants));
    }
    return res;
};
