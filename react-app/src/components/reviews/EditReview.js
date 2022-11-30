import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory} from 'react-router-dom';
import { updateReview } from '../../store/review';

function EditReviewForm({closeModal,reviewId}){
    const reviewData = useSelector(state => state.review.user[reviewId])

    //form fields
    const [star_rating, setStarRating] = useState(reviewData.star_rating);
    const [review, setReview] = useState(reviewData.review);
    const [errors, setErrors] = useState([]);
    const [submit, setSubmit] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    if(!user) return (<Redirect to='/'/>);

    //handle submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);

        const editedReview = {
            star_rating,
            review,
        }
        setErrors([]);

        return dispatch(updateReview(editedReview, reviewId))
                .then(closeModal())
                .then(window.alert('review edits accepted'))
                .then(history.push('/'))
    };

    const exitFromModal = (e) => {
        closeModal();
    };

    return (
        <div className='form-container'>
            <button className="exit-icon" onClick={exitFromModal}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <span className='form-heading'>Edit Review</span>
            <form onSubmit={handleSubmit} className="review-form">
                <div>
                    <label htmlFor='star_rating'>Please Rate this restaurant</label>
                        <select
                            type='star_rating'
                            id='star_rating'
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
                    <label>write a detailed review!</label>
                        <textarea
                            type='review'
                            name='review'
                            id='review'
                            placeholder='Tell us about your dining experience'
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                </div>
                <button className='button' type='submit'>submit edits</button>
            </form>
        </div>
    )
};

export default EditReviewForm;
