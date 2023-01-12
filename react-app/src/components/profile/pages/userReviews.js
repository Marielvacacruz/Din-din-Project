import {useSelector} from "react-redux";
import ReviewCard from "./reviewCard";

function UserReviews({isLoaded}){

    const reviews = useSelector(state => state.review.user);

    return (
        <div>
            <h3 className="profile-sub-heading">Reviews</h3>
            { isLoaded && (
                Object.values(reviews).length ? (
                <div className="reviews-list">
                    {Object.values(reviews).map((review) => {
                        return <ReviewCard key={review.id} review={review}/>

                    })}
                </div>
                ) : <p>Looks like there are no reviews yet!</p>
            )}
        </div>
    )
};

export default UserReviews;
