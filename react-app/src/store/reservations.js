//constants
const GET_USER_RESERVATIONS = 'GET_USER_RESERVATIONS'
const CREATE_RESERVATION = 'CREATE_RESERVATION'
const UPDATE_RESERVATION = 'UPDATE_RESERVATION'
const DELETE_RESERVATION = 'DELETE_RESERVATION'

//action creators
const getReservations = (reservations) => {
    return{
        type: GET_USER_RESERVATIONS,
        reservations,
    };
}


const addReservation = (reservation) => {
    return {
        type: CREATE_RESERVATION,
        reservation
    };
}

const editReservation = (reservation) => {
    return {
        type: UPDATE_RESERVATION,
        reservation
    };
}

const deleteReservation = (reservationId) => {
    return {
        type: DELETE_RESERVATION,
        reservationId
    };
}


//thunks

//get all reservations
export const fetchReservations = () => async (dispatch) => {
    const res = await fetch('/api/reservations/user');

    if(res.ok){
        const data = await res.json();
        dispatch(getReservations(data.reservations));
    }
    return res;
};


//Add new Reservation
export const createReservation = (reservation) => async(dispatch) => {
    const {
        time,
        date,
        guest_count,
        restaurant_id,
    } = reservation

    const res = await fetch(`/api/reservations/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          time,
          date,
          guest_count,
          restaurant_id
        }),
    });
    const data = await res.json();
    console.log(data)
    dispatch(addReservation(data));
    return res;
};

//Edit a Reservation
export const updateReservation = (reservation, id) => async(dispatch) => {
    let {time, date, guest_count,restaurant_id} = reservation

    const res = await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          time,
          date,
          guest_count,
          restaurant_id
        }),
    });
    if(res.ok){
        const data = await res.json();
        dispatch(editReservation(data));
    };
    return res

};

//Delete reservation
export const cancelReservation = (reservationId) => async(dispatch) => {
    const res = await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE'
    });
    const response = await res.json();
    if(res.status === 200){
        dispatch(deleteReservation(reservationId));
    }
    return response;
};


//Reducer
export default function reservationReducer(state = {}, action){
    const newState = {...state};

    switch(action.type){
        case GET_USER_RESERVATIONS:
            action.reservations.forEach((reservation) => {
                newState[reservation.id] = reservation;
            });
            return newState;

        case CREATE_RESERVATION:
            newState[action.reservation.id] = action.reservation;
            break;

        case UPDATE_RESERVATION:
            newState[action.reservation.id] = action.reservation;
            break;

        case DELETE_RESERVATION:
            delete newState[action.reservationId];
            break;

        default:
            break;
    }
    return newState;
};
