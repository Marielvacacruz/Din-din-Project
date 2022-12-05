import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createReview } from "../../store/review";

function ReviewForm({ closeModal, restaurantId }) {
  //form fields
  const [star_rating, setStarRating] = useState(1);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  if (!user) return <Redirect to="/" />;

  //handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    const newReview = {
      star_rating,
      review,
      restaurant_id: restaurantId,
    };

    setErrors([]);

    const data = await dispatch(createReview(newReview))
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
      <span className="form-heading">New Review</span>
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
          <textarea
            type="text"
            name="review"
            id="review"
            minLength="1"
            maxLength="500"
            rows={5}
            placeholder="Tell us about your dining experience"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        </div>
        <button className="button" type="submit">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
