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
        <div>
            <div>
                <Link to={`/restaurants/${restaurant.state}/${restaurant.url_slug}`}>
                    <img src={restaurant.preview_img_url} alt='restaurant icon'/>
                </Link>
            </div>
            <div>
                <Link to ={`/restaurants/${restaurant.state}/${restaurant.url_slug}`}>{restaurant.name}</Link>
            </div>
            <div>
                <span>
                    <i class="fa-regular fa-calendar"></i>
                    <p> {formattedDate}</p>
                    <p>{convertTime}</p>
                </span>
                <span>
                    <i class="fa-solid fa-people-group"></i>
                    <p>{guest_count} Guests</p>
                </span>
            </div>
            <div>
                {upcoming ? (
                    <div>
                        <EditResModal reservation={reservation}/>
                        <button onClick={handleCancellation}>cancel reservation</button>
                    </div>

                ): <ReviewModal restaurantId={restaurant.id}/>
            }
            </div>

        </div>
    )


};

export default ReservationCard;
