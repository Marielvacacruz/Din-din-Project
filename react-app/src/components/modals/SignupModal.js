import React, {useState} from 'react';
import {ParentModal} from './Modal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

function SignupModal(){
    const [showModal, setShowModal] = useState(false);
    const [switchForm, setSwitchForm] = useState(true);

    return (
        <>
        <button className='signup-button' onClick={() => setShowModal(true)}>
            Join Din Din
        </button>
        {showModal &&(
            <ParentModal onClose={() => setShowModal(false)}>
                {switchForm ? (
                    <SignUpForm
                        closeModal={() => setShowModal(false)}
                        switchForm={() => setSwitchForm(!switchForm)}
                    />
                ): (
                    <LoginForm
                        closeModal={() => setShowModal(false)}
                        switchForm={() => setSwitchForm(!switchForm)}
                    />
                )}
            </ParentModal>
        )}
        </>
    );
};

export default SignupModal;
