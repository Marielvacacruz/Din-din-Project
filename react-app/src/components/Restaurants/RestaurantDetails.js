import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRestaurant } from "../../store/restaurant";
import { getRestaurantReviews } from "../../store/review";
import ReservationModal from "../modals/ReservationModal";

function RestaurantPage() {
  const dispatch = useDispatch();
  const { restaurant_url } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getRestaurant(restaurant_url)).then(() =>
      dispatch(getRestaurantReviews(restaurant_url)).then(() =>
        setIsLoaded(true)
      )
    );
  }, [dispatch, restaurant_url, isLoaded]);

  const restaurant = useSelector(
    (state) =>
      state.restaurant.restaurants[state.restaurant.urls[restaurant_url]]
  );
  const reviews = useSelector((state) => state.review.restaurant);

  return (
    isLoaded && (
      <div className="Restaurant-Page-Container">
        <div id="main-info">
          <h1>{restaurant.name}</h1>
          <div>
            <i class="fa-solid fa-star"></i>
            {restaurant.rating}
          </div>
          <span>{restaurant.type}</span>
          <span>{restaurant.price_range}</span>
          <div>
            <i class="fa-solid fa-location-dot"></i>
            {restaurant.neighborhood}
          </div>
          {user && <ReservationModal restaurantId={restaurant.id} />}
          {!user && (
            <div>
              <p>To make a reservation: Please log in or sign up!</p>
            </div>
          )}
          {/* <div id="outer-button-container">
            <div id="inner-button-container">SAVE BUTTON HERE</div>
          </div> */}
        </div>
        {/* <div id="res-image-container">
          <div className="Image">IMAGE HERE</div>
        </div> */}
        <div id="about">
          <h3>About {restaurant.name}</h3>
          {restaurant.about}
        </div>

        <div id="restaurant-reviews">
          <h3>Reviews</h3>
          {reviews &&
            Object.keys(reviews).map((reviewId) => {
              return (
                <div key={reviewId}>
                  <span>{reviews[reviewId].user.first_name}</span>
                  <span>Overall Rating: {reviews[reviewId].star_rating}</span>
                  <span>{reviews[reviewId].review}</span>
                </div>
              );
            })}
        </div>
        <div id="location-container">
          <div id="location-info">
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address_line}</p>
            <p>
              {restaurant.city}, {restaurant.state} {restaurant.zip_code}
            </p>
          </div>
          <div id="contact-info">
            <a href="tel: 1+" {...restaurant.phone_num}>
              <i class="fa-solid fa-phone"></i>
              <span>{restaurant.phone_num}</span>
            </a>
            <a href={restaurant.website_url} target="blank">
              <i class="fa-solid fa-circle-info"></i>
              <span>{restaurant.website_url}</span>
            </a>
          </div>
        </div>
      </div>
    )
  );
}

export default RestaurantPage;
