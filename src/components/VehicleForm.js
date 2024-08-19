import React, {useState} from "react";
import { TextField, Checkbox, Button, FormControlLabel} from "@mui/material";

function VehicleForm({ addVehicle }){
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [airConditioning, setAirConditioning] = useState('');
    
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
        <form onSubmit={handleSubmit}>
            <TextField
                label="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />
            <TextField
                label="Year"
                value={year}
                onChange={(e) => setModel(e.target.value)}
            />
            <TextField
                label="Price Per Day"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
            />
            <FormControlLabel
                control={<Checkbox
                    checked={airConditioning}
                    onChange={(e) => setAirConditioning(e.target.checked)}
                />}
                label="Air Conditioning"
            />
            <Button type="submit" variant="contained" color="primary">
                Add Vehicle
            </Button>
        </form>
    );
}

export default VehicleForm;