import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

function ReservationTable({ reservations, vehicles }) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Pick-Up Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Customer Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => {
            const vehicle = vehicles.find(v => v.id === reservation.vehicleId);
            return (
              <TableRow key={reservation.id}>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{reservation.pickUpDate}</TableCell>
                <TableCell>{reservation.returnDate}</TableCell>
                <TableCell>{reservation.totalPrice}</TableCell>
                <TableCell>{reservation.customerRating}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ReservationTable;

