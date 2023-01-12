import { useSelector } from "react-redux";
import ReservationCard from "../../Reservations/reservationCard";

function UserReservations({isLoaded}){
    const reservations = useSelector(state => state.reservations);

    const upcomingReservations = [];
    const pastReservations = [];

    //check reservation date and sort
    if(isLoaded && reservations){
        Object.values(reservations).forEach((reservation) => {
            const [h, mm]= reservation.time.split(':')
            const [y, m , d] = reservation.date.split("-")
            const formattedDate = new Date(+y, m -1, +d, +h, +mm)
            const today = new Date()

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
                <h3 className="profile-sub-heading">Upcoming Reservations</h3>
                {isLoaded && upcomingContainer}
                {!upcomingContainer && (<p>No upcoming reservations.</p>)}
            </div>
            <div>
                <h3 className="profile-sub-heading">Past Reservations</h3>
                {isLoaded && pastContainer}
                {!pastContainer && (<p>Nothing to show.</p>)}
            </div>
        </div>
    )
};

export default UserReservations;
