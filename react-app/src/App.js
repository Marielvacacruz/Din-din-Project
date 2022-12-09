import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import RestaurantList from './components/Restaurants/RestaurantList';
import RestaurantPage from './components/Restaurants/RestaurantDetails';
import Footer from './components/Navigation/Footer';
import HomePage from './components/HomePage';
import UserProfile from './components/profile/ProfilePage';
import PageNotFound from './components/Utility/PageNotFound';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <HomePage/>
        </Route>
        <Route path='/restaurants/:state' exact={true}>
          <RestaurantList/>
        </Route>
        <Route path='/restaurants/:state/:restaurant_url' exact={true}>
          <RestaurantPage/>
        </Route>
        <ProtectedRoute path='/profile' exact={true}>
          <UserProfile/>
        </ProtectedRoute>
        <Route>
          <PageNotFound/>
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
