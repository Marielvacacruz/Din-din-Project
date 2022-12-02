import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cancelReservation } from "../../store/reservations";
import ReviewModal from "../modals/ReviewModal";
//import ReservationModal once created

function ReservationCard({reservation, upcoming}){
    const dispatch = useDispatch();
    const {time, date, guest_count, restaurant, id} = reservation;
    const [dofw, day, month , year] = reservation.date.split(" ");

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
                    <p> {dofw} {month} {day} {year}</p>
                    <p>{time} PM</p>
                </span>
                <span>
                    <i class="fa-solid fa-people-group"></i>
                    <p>{guest_count} Guests</p>
                </span>
            </div>
            <div>
                {upcoming ? (
                    <div>
                        <button>cancel reservation</button>
                        <button>make changes</button>

                    </div>

                ): <ReviewModal restaurantId={restaurant.id}/>
            }
            </div>

        </div>
    )


};

export default ReservationCard;
