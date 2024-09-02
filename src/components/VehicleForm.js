import React, { useState } from "react";
import { TextField, Checkbox, Button, FormControlLabel, Box } from "@mui/material";

function VehicleForm({ addVehicle }) {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [airConditioning, setAirConditioning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      id: Date.now(),
      model,
      year,
      pricePerDay,
      airConditioning,
      ratings: [],
      available: true,
    };
    addVehicle(newVehicle);
    setModel('');
    setYear('');
    setPricePerDay('');
    setAirConditioning(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { mb: 2 } }}>
      <TextField
        label="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        fullWidth
      />
      <TextField
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        fullWidth
      />
      <TextField
        label="Price Per Day"
        value={pricePerDay}
        onChange={(e) => setPricePerDay(e.target.value)}
        fullWidth
      />
      <FormControlLabel
        control={<Checkbox
          checked={airConditioning}
          onChange={(e) => setAirConditioning(e.target.checked)}
        />}
        label="Air Conditioning"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Vehicle
      </Button>
    </Box>
  );
}

export default VehicleForm;
