import React from 'react';

const Seat = ({ seat, isSeatSelected, onClick }) => {
  return (
    <div className={`seat ${isSeatSelected ? 'selected' : 'available'}`} onClick={onClick}>
      {seat}
    </div>
  );
};

export default Seat;