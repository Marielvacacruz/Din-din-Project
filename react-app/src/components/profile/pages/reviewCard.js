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
        <div className="card" key={review.id}>
            <Link className="link" to={`/restaurants/${review.restaurant?.state}/${review.restaurant?.url_slug}`}>
                <span className="restaurant-name">{review.restaurant?.name}</span>
            </Link>
            <div className="review-details-container">
                <div>
                <i className="fa-solid fa-star"></i>
                <span className="rating-span">{review.star_rating}</span>
                </div>
                <span >{review.review}</span>
            </div>
            <div className="card-button-container">
                <EditReviewModal reviewId={review.id}/>
                <button className="global-button" onClick={handleDelete}>Delete Review</button>

            </div>
        </div>
    )

};

export default ReviewCard;
