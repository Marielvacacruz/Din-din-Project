import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateReview } from "../../store/review";

function EditReviewForm({ closeModal, reviewId }) {
  const reviewData = useSelector((state) => state.review.user[reviewId]);

  //form fields
  const [star_rating, setStarRating] = useState(reviewData.star_rating);
  const [review, setReview] = useState(reviewData.review);
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  if (!user) return <Redirect to="/" />;

  //handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    const editedReview = {
      star_rating,
      review,
    };
    setErrors([])

    const data = await dispatch(updateReview(editedReview, reviewId))
    if (data) {
      setErrors(data);
    }else{closeModal(); window.alert('your edits were submitted')}
  }

  const exitFromModal = (e) => {
    closeModal();
  };

  return (
    <div className="form-container">
      <button className="exit-icon" onClick={exitFromModal}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <span className="form-heading">Edit Review</span>
      <form onSubmit={handleSubmit} className="review-form">
        <div>
          <label htmlFor="star_rating">Please Rate this restaurant</label>
          <select
            type="star_rating"
            id="star_rating"
            value={star_rating}
            onChange={(e) => setStarRating(e.target.value)}
            required
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          {/* <label>write a detailed review!</label> */}
          <textarea
            type="text"
            name="review"
            id="review"
            minLength='1'
            maxLength='500'
            rows={5}
            placeholder="Tell us about your dining experience"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <div>
            {errors?.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}
          </div>
        </div>
        <button className="form-button" type="submit">
          submit edits
        </button>
      </form>
    </div>
  );
}

export default EditReviewForm;
