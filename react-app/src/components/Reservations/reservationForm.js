import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { createReservation } from "../../store/reservations";
import LoginForm from "../auth/LoginForm";

function ReservationForm({ closeModal, restaurantId }) {
  //form fields
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [guest_count, setGuestCount] = useState(1);
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false);

  const today = moment().format("YYYY-MM-DD");
  const sixMonthsOut = moment().add(6, "months").format("YYYY-MM-DD");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  if (!user) return <Redirect to="/" />;

  //handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    const reservation = {
      time,
      date,
      guest_count,
      restaurant_id: restaurantId,
    };
    setErrors([]);

    return await dispatch(createReservation(reservation))
      .then(() => {
        closeModal();
        window.alert("Your reservation has been booked!");
      })
      .catch((e) => setErrors([...e]));
  };

  const exitFromModal = (e) => {
    closeModal();
  };

  return (
    <div className="form-container">
      <button className="exit-icon" onClick={exitFromModal}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <span className="form-heading">Reservations</span>
      <form onSubmit={handleSubmit} className="review-form">
        <div>
          <label htmlFor="guest_count">Guests</label>
          <select
            type="guest_count"
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
            name="date"
            type="date"
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
            name="time"
            type="time"
            min="12:00:00"
            max="23:00:00"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button className="button" type="submit">
          book now
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
