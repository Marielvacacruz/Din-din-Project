import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UnAuthNav from './UnAuthUser';
import AuthNav from './AuthenticatedUser';

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);

  return (
    <nav id='navigation-container'>
      <div className='home-link-container'>
        <NavLink className='home-link' exact to='/'>
          <p id='din-din'>Din Din</p>
          </NavLink>
      </div>
      {currentUser? <AuthNav /> : <UnAuthNav/>}
    </nav>
  );
}

export default NavBar;
