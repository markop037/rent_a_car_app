import './App.css';
import React, { useState } from 'react';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';
import VehicleCard from './components/VehicleCard';
import ReservationForm from './components/ReservationForm';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [reservations, setReservations] = useState([]);

  const addVehicle = (vehicle) => {
    setVehicles([...vehicles, vehicle]);
  };

  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  const updateVehicle = (updatedVehicle) => {
    setVehicles(vehicles.map(vehicle =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    ));
  };

  return (
    <div className='App'>
      <h1>Rent-a-Car Agency</h1>
      <VehicleForm addVehicle={addVehicle} />
      <VehicleList 
        vehicles={vehicles}
        deleteVehicle={deleteVehicle}
        updateVehicle={updateVehicle}
      />
      <VehicleCard vehicles={vehicles} />
      <ReservationForm 
        reservations={reservations} 
        setReservations={setReservations} 
        vehicles={vehicles} 
      />
    </div>
  );
}

export default App;

