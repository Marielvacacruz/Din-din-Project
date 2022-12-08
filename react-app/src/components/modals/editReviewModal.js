import React, {useState} from 'react';
import {ParentModal} from './Modal';
import EditReviewForm from '../reviews/EditReview'


function EditReviewModal({reviewId}){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button className='global-button' onClick={() => setShowModal(true)}>
            Edit Review
        </button>
        {showModal &&(
            <ParentModal onClose={() => setShowModal(false)}>
                    <EditReviewForm
                        closeModal={() => setShowModal(false)}
                        reviewId = {reviewId}
                    />
            </ParentModal>
        )}
        </>
    );
};

export default EditReviewModal;
