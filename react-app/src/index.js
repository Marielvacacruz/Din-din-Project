import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './components/modals/Modal';

//style sheets
import './styles/restaurantCard.css'
import './styles/RestaurantList.css'
import './styles/footer.css'
import './styles/navigation.css'
import './styles/homePage.css'
import './styles/reservationCard.css'

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
