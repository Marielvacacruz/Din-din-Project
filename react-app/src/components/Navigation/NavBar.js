import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UnAuthNav from './UnAuthUser';
import AuthNav from './AuthenticatedUser';

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div>
        <NavLink className='din-din' exact to='/'>Din Din</NavLink>
        <p>book your next dinner reservation with us!</p>
      </div>
      {currentUser? <AuthNav /> : <UnAuthNav/>}
    </nav>
  );
}

export default NavBar;
