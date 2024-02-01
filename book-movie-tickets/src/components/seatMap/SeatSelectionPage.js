import React from 'react';
import CinemaHall from './CinemaHall';
import './seat.css'
import { useState,useEffect } from 'react';

const SeatSelectionPage = () => {
  const rows = 8;
  const columns = 10;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const HandleSeatClick = (seat) => {
    setSelectedSeats((prevSeats) => [...prevSeats, seat]);
    const pricePerSeat = 75000;
    const calculatedTotalPrice = (selectedSeats.length + 1) * pricePerSeat;
    setTotalPrice(calculatedTotalPrice);

  };

  return (
    <div className="seat-selection-page">
      <h2>Chọn Ghế</h2>
      <CinemaHall rows={rows} columns={columns} onSeatClick={HandleSeatClick} />
    </div>
  );
};

export default SeatSelectionPage;