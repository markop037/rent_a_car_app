import React, { useState } from 'react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';
import VehicleCard from './components/VehicleCard';
import ReservationForm from './components/ReservationForm';
import ReservationTable from './components/ReservationTable';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addVehicle = (vehicle) => {
    const newVehicle = { ...vehicle, id: nextId };
    setVehicles([...vehicles, newVehicle]);
    setNextId(nextId + 1);
  };

  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  const updateVehicle = (updatedVehicle) => {
    setVehicles(vehicles.map(vehicle =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    ));
  };

  const updateVehicleAvailability = (vehicleId, available) => {
    setVehicles(vehicles.map(vehicle =>
      vehicle.id === vehicleId ? { ...vehicle, available } : vehicle
    ));
  };

  const updateVehicleRating = (vehicleId, newRating) => {
    setVehicles(vehicles.map(vehicle => {
      if (vehicle.id === vehicleId) {
        const updatedRatings = [...vehicle.ratings, newRating];
        return { 
          ...vehicle, 
          ratings: updatedRatings 
        };
      }
      return vehicle;
    }));
  };

  const addReservation = (reservation) => {
    setReservations([...reservations, reservation]);
  };

  const updateReservation = (updatedReservations) => {
    setReservations(updatedReservations);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center"  sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
        Rent A Car Agency
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box padding={2}>
              <Typography variant="h6" gutterBottom>
                Add New Vehicle
              </Typography>
              <VehicleForm addVehicle={addVehicle} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box padding={2}>
              <Typography variant="h6" gutterBottom sx={{paddingBottom: '16px' }}>
                Top Rated Vehicles
              </Typography>
              <VehicleCard vehicles={vehicles} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box padding={2}>
              <Typography variant="h6" gutterBottom>
                Vehicle List
              </Typography>
              <VehicleList 
                vehicles={vehicles}
                deleteVehicle={deleteVehicle}
                updateVehicle={updateVehicle}
                updateVehicleRating={updateVehicleRating}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box padding={2}>
              <Typography variant="h6" gutterBottom>
                Make a Reservation
              </Typography>
              <ReservationForm 
                reservations={reservations} 
                setReservations={setReservations} 
                vehicles={vehicles}
                addReservation={addReservation}  
                updateVehicle={updateVehicle} 
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box padding={2}>
              <Typography variant="h6" gutterBottom>
                Reservation List
              </Typography>
              <ReservationTable 
                reservations={reservations} 
                vehicles={vehicles} 
                updateReservation={updateReservation} 
                updateVehicleAvailability={updateVehicleAvailability} 
                updateVehicleRating={updateVehicleRating}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;







