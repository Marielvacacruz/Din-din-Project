import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {getUserReviews} from '../../store/review';
import UserReviews from "./pages/userReviews";

function UserProfile(){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        if (!isLoaded)
            (async () => {
                await dispatch(getUserReviews());
                setIsLoaded(true);
            })();
    }, [dispatch, isLoaded,]);

    const [userReviews, setUserReviews] = useState(false);

    const handleReviewsPage = () => {
        setUserReviews(true)
    };

    //if user logs out while on profile redirect to home page:
    if(!currentUser) return <Redirect to="/"/>;
    return (
        <div id="user-profile-page">
            <div id="user-details">
                <h1>{currentUser.first_name} * {currentUser.last_name}</h1>
            </div>
            <nav className="toggle-container">
                <div className="row">
                    <div className="toggles">
                        {/* <button className={userStories? "toggle-button-selected": "toggle-button"} onClick={handleStoriesPage}>Stories</button> */}
                        { currentUser && (
                        <button className={userReviews? "toggle-button-selected": "toggle-button"} onClick={handleReviewsPage}>Reviews</button>
                        )}
                       {/* <button className={userBio? "toggle-button-selected": "toggle-button"} onClick={handleAboutPage}>About</button> */}
                    </div>
                </div>
            </nav>
            <div className="pages-container">
                {/* {userStories? <UserStoriesFeed stories={userProfile.Stories}/> : null} */}
                {userReviews? <UserReviews isLoaded={isLoaded}/> : null}
                {/* {userBio? <UserBio bio={userProfile.bio}/> : null } */}
            </div>

        </div>
    )
};

export default UserProfile;
