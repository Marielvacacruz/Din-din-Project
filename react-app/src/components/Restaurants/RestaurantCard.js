function RestaurantCard({restaurant}){

     //if restaurant card clicked, send user to restaurant details
     const handleClick = (city, url_slug) => {
        history.push(`/restaurants/${city}/${url_slug}`)
    };

    return(
        <div className="restaurant-card" onClick={() => handleClick(restaurant.city, restaurant.url_slug)}>
             <div className="thumbnail-container">
                <img src={restaurant.preview_img_url}
                alt="restaurant image"
                className="preview-image"
                />
            </div>

            <div className="card-details">
                <Link to={`/restaurants/${restaurant.url_slug}`} className="detail-name">{restaurant.name}</Link>
                <div>
                <i class="fa-sharp fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
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
