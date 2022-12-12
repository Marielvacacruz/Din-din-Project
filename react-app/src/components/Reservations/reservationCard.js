import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';
import { cancelReservation } from "../../store/reservations";
import ReviewModal from "../modals/ReviewModal";
import EditResModal from "../modals/editReservationModal";

function ReservationCard({reservation, upcoming}){
    const dispatch = useDispatch();
    const {time, guest_count, restaurant, id} = reservation;
    const formattedDate = moment(reservation.date).format("ddd, MMM Do YYYY")



    const convertTime = moment(time, "HH:mm").format('h:mm a');


    const handleCancellation = (e) => {
        e.preventDefault();

        dispatch(cancelReservation(id));
        window.alert('Your reservation has been cancelled')
    };

    return(
        <div className="card">
            <div className="thumbnail-container">
                <Link to={`/restaurants/${restaurant.state}/${restaurant.url_slug}`}>
                    <img className="card-thumbnail" src={restaurant.preview_img_url} alt='restaurant icon'/>
                </Link>
            </div>
            <div className="name-container">
                <Link className="link" to ={`/restaurants/${restaurant.state}/${restaurant.url_slug}`}>
                    <span className="restaurant-name">{restaurant.name}</span>
                </Link>
            </div>
            <div className="res-details-container">
                <div className="reservation-summary-row">
                    <i className="fa-regular fa-calendar"></i>
                    <p> {formattedDate} {convertTime}</p>
                </div>
                <div className="reservation-summary-row">
                    <i className="fa-solid fa-people-group"></i>
                    <p>{guest_count} Guests</p>
                </div>
            </div>
            <div className="card-button-container">
                {upcoming ? (
                    <div>
                        <EditResModal reservation={reservation}/>
                        <button className="global-button" onClick={handleCancellation}>cancel reservation</button>
                    </div>

                ): <ReviewModal restaurantId={restaurant.id}/>
            }
            </div>

        </div>
    )


};

export default ReservationCard;
