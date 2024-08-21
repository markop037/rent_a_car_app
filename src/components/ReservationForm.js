import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

function ReservationForm({ reservations, setReservations, vehicles, updateVehicle }) {
  const [vehicleId, setVehicleId] = useState('');
  const [pickUpDate, setPickUpDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicle = vehicles.find(v => v.id === vehicleId);
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
        label="Select Vehicle"
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        required
      >
        {vehicles.map(vehicle => (
          <MenuItem key={vehicle.id} value={vehicle.id}>
            {vehicle.model}
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
      <Button type="submit" variant="contained" color="primary">
        Reserve
      </Button>
    </form>
  );
}

export default ReservationForm;

