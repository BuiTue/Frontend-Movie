import React, { useState } from 'react';
import Seat from './Seat';

const CinemaHall = ({ rows, columns, onSeatClick, seatPrices }) => {
  const [seatStatus, setSeatStatus] = useState(Array.from({ length: rows }, () => Array(columns).fill('available')));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSeatClick = (row, column) => {
    const newSeatStatus = [...seatStatus];
    const seat = `${row}${column}`;

    // Kiểm tra trạng thái của ghế, nếu là 'available' thì chuyển sang 'selected', ngược lại
    newSeatStatus[row][column] = newSeatStatus[row][column] === 'available' ? 'selected' : 'available';

    setSeatStatus(newSeatStatus);
    onSeatClick(row, column, seatPrices[row]);

    // Cập nhật selectedSeats dựa trên trạng thái mới của ghế
    const updatedSelectedSeats = [];
    newSeatStatus.forEach((row, rowIndex) => {
      row.forEach((status, columnIndex) => {
        if (status === 'selected') {
          updatedSelectedSeats.push(`${rowIndex}${columnIndex}`);
        }
      });
    });
    setSelectedSeats(updatedSelectedSeats);
  };

  return (
    <div className="cinema-hall">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {Array.from({ length: columns }).map((_, columnIndex) => {
            const seat = `${rowIndex}${columnIndex}`;
            const isSeatSelected = seatStatus[rowIndex][columnIndex] === 'selected';

            return (
              <Seat
                key={columnIndex}
                seat={seat}
                isSeatSelected={isSeatSelected}
                onClick={() => handleSeatClick(rowIndex, columnIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CinemaHall;