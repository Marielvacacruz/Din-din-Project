# Din Din
**Din Din** is a clone of [OpenTable](https://opentable.com) and [Resy](https://resy.com) a booking platform where users can discover new restaurants in their local city and book a dinner reservation.
**Din Din** aims to mimic some of these features both on the front and backend.

## Live site
[Open Din Din](https://din-din.onrender.com)

### This project uses the following technologies
### Frontend
* Javascript
* React
* Redux
* FontAwesome
### Backend
* PostgreSQL (production)
* SQLite3 (development)
* Python
* Flask
* SQLAlchemy
* Alembic

## Getting started
1. Clone the repository and install dependencies by running `pipenv install` in your terminal

2. Create a `.env` file based on the example provided

3. Activate a pipenv shell environment by running `pipenv shell`

4. Migrate and seed your databases with `flask db migrate` and  `flask seed all`

5. Start your development app in your terminal using `flask run`

6. Open another terminal window and cd into `react-app`

7. Run `npm install` to install frontend dependencies

8. Start the frontend server using `npm start`

The application will now be running at http://localhost:3000/


# CRUD Features

## User
    The clone currently allows a user to:
        - Log in
        - Sign up
        - Explore restaurants
        - Use the DEMO USER login
        - Navigate to user profile

## Restaurants
    As a non-logged in user you can:
        - Explore Restaurants
        - View Restaurant Details Page

## Reservations
    A logged in user can:
        - Book a dinner Reservation
        - View upcoming and past Reservations in user profile
        - Change upcoming Reservations
        - Cancel a Reservation

## Reviews
    A logged in user can:
        - Leave a Review on past reservations
        - View their Reviews through the user profile
        - View other user's Reviews via restaurant details page
        - Edit a Review
        - Delete a Review
        
 ## Favorites
    A logged in user can:
        - Favorite a restaurant
        - Unfavorite a restaurant
        - View a list of their favorite restaurants via user profile

# Future Features

This clone is a work in progress, these features will be available in the future...

-  CRUD actions for Restaurants (add a restaurant and delete a restaurant)
-  Image Gallery (viewed via restaurant details page)
-  Google Map + directions to restaurant
-  Second step to confirm reservation cancellation
-  Email or Text reservation confirmation 

## For more detailed documentation checkout this project's [wiki](https://github.com/Marielvacacruz/Din-din-Project/wiki)
