import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

function ReservationForm({ reservations, setReservations, vehicles, updateVehicle }) {
  const [vehicleId, setVehicleId] = useState('');
  const [pickUpDate, setPickUpDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicle = vehicles.find(v => v.id === vehicleId);

    if (new Date(pickUpDate) >= new Date(returnDate)) {
      setError('Pick-Up Date must be before Return Date');
      return;
    }

    const isReserved = reservations.some(reservation => 
      reservation.vehicleId === vehicleId &&
      ((new Date(pickUpDate) <= new Date(reservation.returnDate)) &&
       (new Date(returnDate) >= new Date(reservation.pickUpDate)))
    );

    if (isReserved) {
      setError('Vehicle is already reserved for the selected dates');
      return;
    }

    setError('');

    const days = (new Date(returnDate) - new Date(pickUpDate)) / (1000 * 60 * 60 * 24);
    const totalPrice = days * vehicle.pricePerDay;

    const newReservation = {
      id: Date.now(),
      vehicleId,
      pickUpDate,
      returnDate,
      totalPrice,
      customerRating: 0,
    };
    setReservations([...reservations, newReservation]);

    const updatedVehicle = { ...vehicle, available: false };
    updateVehicle(updatedVehicle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        select
        label="Select Vehicle by ID"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        required
      >
        {vehicles.map(vehicle => (
          <MenuItem key={vehicle.id} value={vehicle.id}>
            Vehicle ID: {vehicle.id} - {vehicle.model}
          </MenuItem>
        ))}
      </TextField>
      <TextField 
        label="Pick-Up Date" 
        type="date" 
        value={pickUpDate} 
        onChange={(e) => setPickUpDate(e.target.value)} 
        required 
        InputLabelProps={{ shrink: true }} 
      />
      <TextField 
        label="Return Date" 
        type="date" 
        value={returnDate} 
        onChange={(e) => setReturnDate(e.target.value)} 
        required 
        InputLabelProps={{ shrink: true }} 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit" variant="contained" color="primary">
        Reserve
      </Button>
    </form>
  );
}

export default ReservationForm;


