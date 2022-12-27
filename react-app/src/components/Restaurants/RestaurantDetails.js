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
          <div className="main-info-row">
            <i class="fa-solid fa-star"></i>
            {restaurant.rating}
          </div>
          <div className="main-info-row">
            <p>{restaurant.type}</p>
          </div>
          <div className="main-info-row">
            <p>{restaurant.price_range}</p>
          </div>
          <div className="main-info-row">
            <i className="fa-solid fa-location-dot"></i>
            <p>{restaurant.neighborhood}</p>
          </div>
          {user && <ReservationModal restaurantId={restaurant.id} />}
          {!user && (
            <div>
              <p>Please log in or sign up to book your reservation</p>
            </div>
          )}
          {/* <div id="outer-button-container">
            <div id="inner-button-container">SAVE BUTTON HERE</div>
          </div> */}
        </div>
        {/* <div id="res-image-container">
          <div className="Image">
            <img className="preview-img" src={restaurant.preview_img_url}></img>
          </div>
        </div> */}
        <div id="about">
          <div className="about-title">About {restaurant.name}</div>
          <div className="about-text">{restaurant.about}</div>
        </div>

        <div id="restaurant-reviews">
          <h3>Reviews</h3>
          {reviews &&
            Object.keys(reviews).map((reviewId) => {
              return (
                <div className="review-container" key={reviewId}>
                  <span className="review-span">{reviews[reviewId].user.first_name}</span>
                  <span className="review-span">Overall Rating: {reviews[reviewId].star_rating}</span>
                  <span className="review-span">{reviews[reviewId].review}</span>
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
            <a className="contact-row" href="tel: 1+" {...restaurant.phone_num}>
              <i className="fa-solid fa-phone"></i>
              <span>{restaurant.phone_num}</span>
            </a>
            <a
              className="contact-row"
              href={restaurant.website_url}
              target="blank"
            >
              <i className="fa-solid fa-circle-info"></i>
              <span>{restaurant.website_url}</span>
            </a>
          </div>
        </div>
      </div>
    )
  );
}

export default RestaurantPage;
