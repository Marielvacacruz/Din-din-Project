import React, {useState} from 'react';
import {ParentModal} from './Modal';
import EditReservationForm from '../Reservations/editResForm'

function EditResModal({reservation}){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>
            change reservation
        </button>
        {showModal &&(
            <ParentModal onClose={() => setShowModal(false)}>
                    <EditReservationForm
                        closeModal={() => setShowModal(false)}
                        reservation = {reservation}
                    />
            </ParentModal>
        )}
        </>
    );
};

export default EditResModal;
