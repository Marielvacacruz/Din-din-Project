import { useSelector } from "react-redux";
import ReservationCard from "../../Reservations/reservationCard";

function UserReservations({isLoaded}){
    const reservations = useSelector(state => state.reservations);

    const upcomingReservations = [];
    const pastReservations = [];

    //check reservation date and sort
    if(isLoaded && reservations){
        Object.values(reservations).forEach((reservation) => {
            const [y, m , d] = reservation.date.split("-")
            const formattedDate = new Date(+y, m -1, +d)
            const today = new Date()
            console.log('formatted', formattedDate)
            console.log('today', today)
            console.log(today.getTime() > formattedDate.getTime())

            if(today.getTime() > formattedDate.getTime()){
                pastReservations.push(reservation)
            } else upcomingReservations.push(reservation)
        });


        upcomingReservations.sort((a, b) => a.day < b.day ? -1 : 1);

        pastReservations.sort((a, b) => a.day > b.day ? -1 : 1);
    };

    let upcomingContainer

    // fill Upcoming container
        reservations && upcomingReservations.length && (
            upcomingContainer = (
                <div>
                    {upcomingReservations.map((reservation) => (
                        <ReservationCard key={reservation.id} reservation={reservation} upcoming={true}/>
                    ))}
                </div>
            )
        )

    let pastContainer
    //fil past container

    reservations && pastReservations.length &&(
        pastContainer = (
            <div>
                {pastReservations.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} upcoming={false}/>
                ))}
            </div>
        )
    )


    return (
        <div>
            <div>
                <h3>Upcoming Reservations</h3>
                {isLoaded && upcomingContainer}
                {!upcomingContainer && (<p>No upcoming reservations.</p>)}
            </div>
            <div>
                <h3>Past Reservations</h3>
                {isLoaded && pastContainer}
                {!pastContainer && (<p>Nothing to show.</p>)}
            </div>
        </div>
    )
};

export default UserReservations;
