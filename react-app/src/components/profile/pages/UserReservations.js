import { useSelector } from "react-redux";
import ReservationCard from "../../Reservations/reservationCard";

function UserReservations({isLoaded}){
    const reservations = useSelector(state => state.reservations);

    const upcomingReservations = [];
    const pastReservations = [];

    //check reservation date and sort
    if(isLoaded && reservations){
        Object.values(reservations).forEach((reservation) => {
            const resDate = new Date(reservation.date);
            const today = new Date();

            if(today > resDate){
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
