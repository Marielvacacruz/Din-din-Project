import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getRestaurant } from '../../store/restaurant';
import { getRestaurantReviews } from '../../store/review';

function RestaurantPage(){
    const dispatch = useDispatch();
    const { state, restaurant_url } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getRestaurant(state, restaurant_url))
        .then(() => dispatch(getRestaurantReviews(restaurant_url)).then(() => setIsLoaded(true)))
       },[dispatch, restaurant_url, isLoaded, state]);

    const restaurant = useSelector((state) => state.restaurant.restaurants[state.restaurant.urls[restaurant_url]]);
    const reviews = useSelector((state) => state.review.restaurant)



    return isLoaded && (
        <div className='Restaurant-Page-Container'>
            <h1>RESTAURANT DETAILS</h1>
            <div>
                <h2>{restaurant.name}</h2>
                <span>{restaurant.rating}</span>
                <span>{restaurant.type}</span>
            </div>
            <div id='restaurant-reviews'>
                <h3>Reviews</h3>
                { reviews && (
                    Object.keys(reviews).map((reviewId) => {
                        return (
                        <div key={reviewId}>
                            <span>{reviews[reviewId].star_rating}</span>
                            <span>{reviews[reviewId].review}</span>
                        </div>
                        );
                      })
                    )
                }
            </div>
        </div>
    )

};


export default RestaurantPage;
