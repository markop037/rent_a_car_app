import React, { useState } from 'react';
import './App.css';
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
    <div className='App'>
      <h1>Rent-a-Car Agency</h1>
      <VehicleForm addVehicle={addVehicle} />
      <VehicleList 
        vehicles={vehicles}
        deleteVehicle={deleteVehicle}
        updateVehicle={updateVehicle}
        updateVehicleRating={updateVehicleRating}
      />
      <VehicleCard vehicles={vehicles} />
      <ReservationForm 
        reservations={reservations} 
        setReservations={setReservations} 
        vehicles={vehicles}
        addReservation={addReservation}  
        updateVehicle={updateVehicle} 
      />
      <ReservationTable 
        reservations={reservations} 
        vehicles={vehicles} 
        updateReservation={updateReservation} 
        updateVehicleAvailability={updateVehicleAvailability} 
        updateVehicleRating={updateVehicleRating}
      />
    </div>
  );
}

export default App;






