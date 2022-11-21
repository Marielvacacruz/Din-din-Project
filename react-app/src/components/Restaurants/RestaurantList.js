import {useSelector, useDispatch} from "react-redux";
import RestaurantCard from "./RestaurantCard";
import { useEffect } from "react";
import {useParams} from 'react-router-dom';
import { getRestaurantsByCity } from "../../store/restaurant";

function RestaurantList(){
    const restaurants = useSelector((state) => (state.restaurants.restaurants));
    const restaurantCard = Object.values(restaurants).map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)

    const dispatch = useDispatch();
    const {city} = useParams();

    useEffect(() => {
        dispatch(getRestaurantsByCity(city))
    }, [dispatch, city]);

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
