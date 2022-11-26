import React, {useState} from 'react';
import {ParentModal} from './Modal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';

function LoginModal(){
    const [showModal, setShowModal] = useState(false);
    const [switchForm, setSwitchForm] = useState(true);

    return (
        <>
        <button className='login-button' onClick={() => setShowModal(true)}>
            Sign in
        </button>
        {showModal &&(
            <ParentModal onClose={() => setShowModal(false)}>
                {switchForm ? (
                    <LoginForm
                        closeModal={() => setShowModal(false)}
                        switchForm={() => setSwitchForm(!switchForm)}
                    />
                ): (
                    <SignUpForm
                        closeModal={() => setShowModal(false)}
                        switchForm={() => setSwitchForm(!switchForm)}
                    />
                )}
            </ParentModal>
        )}
        </>
    );
};

export default LoginModal;
