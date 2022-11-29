import React, {useState} from 'react';
import {ParentModal} from './Modal';
import ReviewForm from '../reviews/ReviewForm';

function ReviewModal({restaurantId}){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>
            Write Review
        </button>
        {showModal &&(
            <ParentModal onClose={() => setShowModal(false)}>
                    <ReviewForm
                        closeModal={() => setShowModal(false)}
                        restaurantId = {restaurantId}
                    />
            </ParentModal>
        )}
        </>
    );
};

export default ReviewModal;
