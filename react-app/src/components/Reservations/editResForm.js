import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect} from 'react-router-dom';
import moment from 'moment';
import {updateReservation} from '../../store/reservations';

function EditReservationForm({closeModal, reservation}){
    //form fields
    const [time, setTime] = useState(reservation.time);
    const [date, setDate] = useState(reservation.date);
    const [guest_count, setGuestCount] = useState(reservation.guest_count);
    const [errors, setErrors] = useState([]);
    const [submit, setSubmit] = useState(false);

    const today = moment().format('YYYY-MM-DD');
    const sixMonthsOut = moment().add(6, 'months').format('YYYY-MM-DD');

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    if(!user) return (<Redirect to='/'/>);

    //handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);

        const editedRes = {
            time,
            date,
            guest_count,
            restaurant_id: reservation.restaurant.id

        }
        setErrors([]);

        const data = await dispatch(updateReservation(editedRes, reservation.id))
                if(data){
                    setErrors(data)
                }else{closeModal(); window.alert('your edits were submitted')}
    };

    const exitFromModal = (e) => {
        closeModal();
    };

    return (
        <div className='form-container'>
            <button className="exit-icon" onClick={exitFromModal}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <span className='form-heading'>Change Reservation</span>
            <form onSubmit={handleSubmit} className="review-form">
                <div>
                    <label htmlFor='guest_count'>Guests</label>
                        <select
                            type='guest_count'
                            value={guest_count}
                            onChange={(e) => setGuestCount(e.target.value)}
                            required
                        >
                            <option value={1}>1 Guest</option>
                            <option value={2}>2 Guests</option>
                            <option value={3}>3 Guests</option>
                            <option value={4}>4 Guests</option>
                            <option value={5}>5 Guests</option>
                            <option value={6}>6 Guests</option>
                            <option value={7}>7 Guests</option>
                        </select>
                </div>
                <div>
                    <label>Date</label>
                    <input
                        name='date'
                        type='date'
                        min={today}
                        max={sixMonthsOut}
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>time</label>
                    <input
                        name='time'
                        type='time'
                        min="16:00"
                        max="23:00"
                        step="900"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <button className='form-button' type='submit'>update</button>
            </form>
        </div>
    )
};

export default EditReservationForm;
