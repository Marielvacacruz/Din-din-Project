import {useSelector} from "react-redux";
import ReviewCard from "./reviewCard";

function UserReviews({isLoaded}){

    const reviews = useSelector(state => state.review.user);

    return (
        <div>
            <h2>Reviews</h2>
            { isLoaded && (
                Object.values(reviews).length ? (
                <div>
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
