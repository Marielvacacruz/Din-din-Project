import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addToFavorites, removeFromFavorites} from "../../store/favorites";

function FavoriteButton({restaurantId}){
    const dispatch = useDispatch();
    const user =  useSelector(state => state.session.user);

    const favorites = useSelector(state => state.favorites[user.id])
    const isFavorite = () => favorites && favorites.includes(restaurantId);

    const [isFave, setIsFave] = useState(isFavorite());

    useEffect(() => {
        setIsFave(isFavorite());
    }, [favorites]);


    const handleClick = (e) =>  {
        e.preventDefault();

        if(isFave) dispatch(removeFromFavorites(user.id, restaurantId))
        else dispatch(addToFavorites(restaurantId));

        setIsFave(!isFave);

    };

    return (
        <button className="Favorite-Button" onClick={handleClick}>
            {isFave? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
        </button>
    )



};

export default FavoriteButton;
