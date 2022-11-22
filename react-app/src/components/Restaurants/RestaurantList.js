import {useSelector, useDispatch} from "react-redux";
import RestaurantCard from "./RestaurantCard";
import { useEffect } from "react";
import {useParams} from 'react-router-dom';
import { getRestaurantsByState } from "../../store/restaurant";

function RestaurantList(){
    const restaurants = useSelector((state) => Object.values(state.restaurant.restaurants));
    const restaurantCard = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)

    const dispatch = useDispatch();
    const {state} = useParams();

    useEffect(() => {
        dispatch(getRestaurantsByState(state))
    }, [dispatch, state]);

    return(
        <div className='restaurant-page'>
            <h1 className='header'>Explore Restaurants</h1>
            <ul className='restaurant-list-container'>
                {restaurantCard}
            </ul>
        </div>
    )
};

export default RestaurantList;
