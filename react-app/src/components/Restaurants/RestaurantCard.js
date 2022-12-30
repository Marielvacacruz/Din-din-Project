import {useHistory, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import ReservationModal from '../modals/ReservationModal';
import FavoriteButton from '../Favorites/FavoriteButton';

function RestaurantCard({restaurant}){
    const history = useHistory();
    const user = useSelector((state) => state.session.user);

     //if restaurant card clicked, send user to restaurant details
     const handleClick = (city, url_slug) => {
        history.push(`/restaurants/${city}/${url_slug}`)
    };

    return(
        <div className="restaurant-card">
             <div className="img-container" onClick={() => handleClick(restaurant.city, restaurant.url_slug)}>
                <img src={restaurant.preview_img_url}
                alt="restaurant interior"
                className="preview-image-thumbnail"
                />
            </div>

            <div className="card-details">
                <Link to={`/restaurants/${restaurant.state}/${restaurant.url_slug}`} className="detail-name">
                    {restaurant.name}
                </Link>
                <div className='rating-container'>
                <i className="fa-solid fa-star"></i>
                    {restaurant.rating}
                </div>
                <div className='info-details'>
                    <p>{restaurant.type}</p>
                    <p>{restaurant.neighborhood}</p>
                    <p>{restaurant.price_range}</p>
                </div>

            </div>
            {user && (
                <div id='button-container'>
                    <ReservationModal restaurantId={restaurant.id}/>
                </div>
            )}
            {/* {!user && (
                <div>
                    <p>Please log in or sign up to book reservation</p>
                </div>
            )} */}
                 {user && (
                <div id='fave-button-container'>
                    <FavoriteButton restaurantId={restaurant.id}/>
                </div>
            )}

        </div>
    )
};

export default RestaurantCard;
