import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({closeModal, switchForm}) => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    let errors= [];
    if(password !== repeatPassword){
      errors.push('Passwords must match');
    };
    setErrors(errors)

    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name,last_name, email, phone_number, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updatePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const exitModal = (e) => {closeModal()};

  const switchLogin = (e) => {switchForm()};

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <button className='exit-icon' onClick={exitModal}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <span className='form-heading'>Join Din Din</span>
      <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={first_name}
          required
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={last_name}
          required
        ></input>
      </div>
      <div>
        <label htmlFor='telNo'>Phone Number </label>
        <input
          type='tel'
          id='telnNo'
          minLength="9"
          maxLength="30"
          name='phone_number'
          required
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          placeholder='format: 123-456-78901'
          onChange={updatePhoneNumber}
          value={phone_number}
        ></input>
        <span className='validity'></span>
      </div>
      <div>
        <label>Email</label>
        <input
          type='email'
          name='email'
          placeholder='name@example.com'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className='form-button' type='submit'>Sign Up</button>
    </form>
    <div>
          <span>
            Already have an account?
            <button className='alt-button' onClick={switchLogin}>Log back in</button>
          </span>
        </div>
    </div>

  );
};

export default SignUpForm;
