import {useHistory, Link} from 'react-router-dom';

function RestaurantCard({restaurant}){
    // history = useHistory();

    //  //if restaurant card clicked, send user to restaurant details
    //  const handleClick = (city, url_slug) => {
    //     history.push(`/restaurants/${city}/${url_slug}`)
    // };

    // onClick={() => handleClick(restaurant.city, restaurant.url_slug)}

    return(
        <div className="restaurant-card">
             <div className="thumbnail-container">
                <img src={restaurant.preview_img_url}
                alt="restaurant interior"
                className="preview-image-thumbnail"
                />
            </div>

            <div className="card-details">
                <Link to={`/restaurants/${restaurant.state}/${restaurant.url_slug}`} className="detail-name">{restaurant.name}</Link>
                <div>
                <i className="fa-solid fa-star"></i>
                    {restaurant.rating}
                </div>
                <p>{restaurant.type}</p>
                <p>{restaurant.neighborhood}</p>
                <p>{restaurant.price_range}</p>
            </div>
            <button>reservation</button>

        </div>
    )
};

export default RestaurantCard;
