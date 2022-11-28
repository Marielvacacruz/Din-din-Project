import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { destroyReview } from "../../../store/review";

function ReviewCard({review}){
    const dispatch = useDispatch;

    const handleDelete = e => {
        e.stopPropagation();
        dispatch(destroyReview(review.id));
        window.alert("You have successfully delete your review")

    };

    //handle delete review

    return (
        <div key={review.id}>
            <Link to={`/restaurants/${review.restaurant.state}/${review.restaurant.url_slug}`}>
                {review.restaurant.name}
            </Link>
            <div>
                {review.star_rating}
                <span>{review.review}</span>
            </div>
        </div>
    )

};

export default ReviewCard;
