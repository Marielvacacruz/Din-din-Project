import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { destroyReview} from "../../../store/review";
import EditReviewModal from "../../modals/editReviewModal"

function ReviewCard({review}){
    const dispatch = useDispatch();

    const handleDelete = e => {
        e.preventDefault();
        dispatch(destroyReview(review.id))
        window.alert("Your review has been deleted")
    };

    return (
        <div key={review.id}>
            <Link to={`/restaurants/${review.restaurant?.state}/${review.restaurant?.url_slug}`}>
                {review.restaurant?.name}
            </Link>
            <div>
                {review.star_rating}
                <p>{review.review}</p>
            </div>
            <div>
                <EditReviewModal reviewId={review.id}/>
                <button onClick={handleDelete}>Delete Review</button>

            </div>
        </div>
    )

};

export default ReviewCard;
