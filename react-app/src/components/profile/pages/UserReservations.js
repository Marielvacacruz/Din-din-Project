import { useSelector } from "react-redux";
import ReservationCard from "../../Reservations/reservationCard";
import moment from "moment";

function UserReservations({isLoaded}){
    const reservations = useSelector(state => state.reservations);

    const upcomingReservations = [];
    const pastReservations = [];

    //check reservation date and sort
    if(isLoaded && reservations){
        Object.values(reservations).forEach((reservation) => {
            // console.log("Reservation Date", reservation.date)
            // const today = moment().format('ddd, DD MMM YYYY, h:mm:ss');
            // console.log("Today:", today)
            // console.log(today > reservation.date)
            const [y, m , d] = reservation.date.split("-")
            const formattedDate = new Date(+y, m -1, +d)
            const today = new Date()

            if(today > formattedDate){
                pastReservations.push(reservation)
            } else upcomingReservations.push(reservation)
        });


        upcomingReservations.sort((a, b) => a.day < b.day ? -1 : 1);

        pastReservations.sort((a, b) => a.day > b.day ? -1 : 1);
    };

    let upcomingContainer

    // fill Upcoming container
        reservations && upcomingReservations.length ? (
            upcomingContainer = (
                <div>
                    {upcomingReservations.map((reservation) => (
                        <ReservationCard key={reservation.id} reservation={reservation} upcoming={true}/>
                    ))}
                </div>
            )
        )  : <p>You don't have any upcoming reservations.</p>

    let pastContainer
    //fil past container

    reservations && pastReservations.length ? (
        pastContainer = (
            <div>
                {pastReservations.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} upcoming={false}/>
                ))}
            </div>
        )
    )  : <p>nothing to show!</p>


    return (
        <div>
            <div>
                <h3>Upcoming Reservations</h3>
                {isLoaded && upcomingContainer}
            </div>
            <div>
                <h3>Past Reservations</h3>
                {isLoaded && pastContainer}
            </div>
        </div>
    )
};

export default UserReservations;
