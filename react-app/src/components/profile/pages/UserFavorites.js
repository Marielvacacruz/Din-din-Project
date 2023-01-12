import { useSelector } from "react-redux";
import RestaurantCard from "../../Restaurants/RestaurantCard";

function UserFaves({isLoaded}){
    const restaurants = useSelector(state => state.favorites.details);

    return(
        <div>
            <h1>Favorites</h1>
            { isLoaded && (
                Object.values(restaurants).length ? (
                <div className="restaurant-list-container">
                    {Object.values(restaurants).map((restaurant) => {
                        return <RestaurantCard key={restaurant.id} restaurant={restaurant}/>

                    })}
                </div>
                ) : <p>Looks like you haven't added any restaurants!</p>
            )}
        </div>
    )



};

export default UserFaves;
