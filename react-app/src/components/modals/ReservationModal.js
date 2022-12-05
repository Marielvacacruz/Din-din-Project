import React, {useState} from 'react';
import {ParentModal} from './Modal';
import ReservationForm from '../Reservations/reservationForm'

function ReservationModal({restaurantId}){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>
            reservation
        </button>
        {showModal &&(
            <ParentModal onClose={() => setShowModal(false)}>
                    <ReservationForm
                        closeModal={() => setShowModal(false)}
                        restaurantId = {restaurantId}
                    />
            </ParentModal>
        )}
        </>
    );
};

export default ReservationModal;