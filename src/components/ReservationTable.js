import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function ReservationTable({ reservations, vehicles, updateReservation, updateVehicleAvailability, updateVehicleRating }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReservationId, setCurrentReservationId] = useState(null);
  const [rating, setRating] = useState('');

  const handleReturnEarly = (reservationId) => {
    setCurrentReservationId(reservationId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRating('');
  };

  const handleSubmitRating = () => {
    const parsedRating = parseInt(rating, 10);
    if (parsedRating >= 1 && parsedRating <= 5 && !isNaN(parsedRating)) {
      const updatedReservations = reservations.map(reservation =>
        reservation.id === currentReservationId
          ? { ...reservation, returned: true, customerRating: parsedRating }
          : reservation
      );
      updateReservation(updatedReservations);

      const reservation = reservations.find(res => res.id === currentReservationId);
      if (reservation) {
        updateVehicleAvailability(reservation.vehicleId, true);
        updateVehicleRating(reservation.vehicleId, parsedRating);
      }

      handleCloseDialog();
    } else {
      alert('Please enter a valid rating between 1 and 5.');
    }
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vehicle ID</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Pick-Up Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Customer Rating</TableCell>
            <TableCell>Returned</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map(reservation => {
            const vehicle = vehicles.find(v => v.id === reservation.vehicleId);
            return (
              <TableRow key={reservation.id}>
                <TableCell>{vehicle ? vehicle.id : 'N/A'}</TableCell> {/* Display Vehicle ID */}
                <TableCell>{vehicle ? vehicle.model : 'N/A'}</TableCell>
                <TableCell>{vehicle ? vehicle.year : 'N/A'}</TableCell>
                <TableCell>{reservation.pickUpDate}</TableCell>
                <TableCell>{reservation.returnDate}</TableCell>
                <TableCell>{reservation.totalPrice}</TableCell>
                <TableCell>{reservation.customerRating || 'N/A'}</TableCell>
                <TableCell>{reservation.returned ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  {!reservation.returned && (
                    <Button onClick={() => handleReturnEarly(reservation.id)} variant="contained" color="primary">
                      Return Early
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Submit Rating</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Rating (1-5)"
            type="number"
            fullWidth
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitRating} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ReservationTable;






