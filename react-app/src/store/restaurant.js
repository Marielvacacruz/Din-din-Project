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
export const getRestaurantsByState = (state) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${state}`);

    if(res.ok){
        const data = await res.json();
        dispatch(setRestaurants(data.restaurants));
    }
    return res;
};

//get details of a res by url slug
export const getRestaurant = (state, restaurant_url) => async (dispatch) => {
    const res = await fetch(`/api/restaurants/${state}/${restaurant_url}/`);

    if(res.ok){
        const data = await res.json();
        dispatch(setRestaurant(data));
    }
    return res;
};


//Add new Restaurant
export const createRestaurant = (restaurant) => async(dispatch) => {
    const {
        name,
        type,
        url_slug,
        price_range,
        about,
        phone_num,
        website_url,
        address_line,
        city,
        state,
        zip_code,
        open_time,
        closing_time,
        neighborhood,
        preview_img_url
    } = restaurant

    const res = await fetch(`/api/restaurant`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name,
            type,
            url_slug,
            price_range,
            about,
            phone_num,
            website_url,
            address_line,
            city,
            state,
            zip_code,
            open_time,
            closing_time,
            neighborhood,
            preview_img_url
        }),
    });
    const data = await res.json();
    dispatch(addRestaurant(data));
    return res;
};

//DELETE Restaurant
export const deleteRestaurant = (restaurantId) => async(dispatch) => {
    const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'DELETE'
    });
    const response = await res.json();
    if(res.status === 200){
        dispatch(removeRestaurant(restaurantId));
    }
    return response;
};


//Reducer
export default function restaurantReducer(state = { restaurants: {}, urls: {} }, action){
    let newState = {...state};
    switch(action.type){
        case SET_RESTAURANTS:
            let restaurantsByState = {restaurants: {}, urls: {}};
            action.restaurants.forEach((restaurant) => {
                restaurantsByState.restaurants[restaurant.id] = restaurant;
                restaurantsByState.urls[restaurant.url_slug] = restaurant.id;
            });
            return restaurantsByState;

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
                if (newState.urls[url] === action.restaurantId)
                    delete newState.urls[url];
            break;

        default:
            return newState;
    };
};
