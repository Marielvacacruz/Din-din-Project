import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUserReviews} from '../../store/review';
import UserReviews from "./pages/userReviews";
import UserReservations from "./pages/UserReservations";
import { fetchReservations } from "../../store/reservations";
import UserFaves from "./pages/UserFavorites";
import { fetchFavorites} from "../../store/favorites";

function UserProfile(){
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const currentUser = useSelector(state => state.session.user);


    useEffect(() => {
        if (!isLoaded)
            (async () => {
                await dispatch(fetchReservations());
                await dispatch(getUserReviews());
                await  dispatch(fetchFavorites());
                setIsLoaded(true);
            })();
    }, [dispatch, isLoaded, currentUser]);

    const [userReviews, setUserReviews] = useState(false);
    const [reservations, setUserReservations] = useState(true);
    const [userFaves, setUserFaves] = useState(false);

    const handleReviewsPage = () => {
        setUserReviews(true)
        setUserReservations(false)
        setUserFaves(false)
    };

    const handleReservationsPage= () => {
        setUserReservations(true)
        setUserReviews(false)
        setUserFaves(false)
    };

    const handleFavoritesPage = () => {
        setUserFaves(true)
        setUserReservations(false)
        setUserReviews(false)
    };


    return (
        <div id="user-profile-page">
            <div id="user-details">
                <h1>{currentUser.first_name} {currentUser.last_name}</h1>
            </div>
            <nav className="toggle-container">
                <div className="row">
                    <div className="toggles">
                        <button className={reservations? "toggle-button-selected": "toggle-button"} onClick={handleReservationsPage}>Reservations</button>
                        { currentUser && (
                        <button className={userReviews? "toggle-button-selected": "toggle-button"} onClick={handleReviewsPage}>Reviews</button>
                        )}
                       <button className={userFaves? "toggle-button-selected": "toggle-button"} onClick={handleFavoritesPage}>Favorites</button>
                    </div>
                </div>
            </nav>
            <div className="pages-container">
                {reservations? <UserReservations isLoaded={isLoaded}/> : null}
                {userReviews? <UserReviews isLoaded={isLoaded}/> : null}
                {userFaves? <UserFaves isLoaded={isLoaded}/> : null }
            </div>

        </div>
    )
};

export default UserProfile;
