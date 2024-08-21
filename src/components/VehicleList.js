import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, Box, TextField, Checkbox, FormControlLabel } from '@mui/material';

function VehicleList({ vehicles, deleteVehicle, updateVehicle, updateVehicleRating }) {
  const [editVehicle, setEditVehicle] = useState(null);

  const handleEditClick = (vehicle) => {
    setEditVehicle(vehicle);
  };

  const handleCloseModal = () => {
    setEditVehicle(null);
  };

  const handleSaveChanges = () => {
    updateVehicle(editVehicle);
    handleCloseModal();
  };

  return (
    <Box sx={{ paddingBottom: '30px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vehicle ID</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Price Per Day</TableCell>
            <TableCell>Air Conditioning</TableCell>
            <TableCell>Average Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.sort((a, b) => a.id - b.id).map(vehicle => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.id}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.pricePerDay}</TableCell>
              <TableCell>{vehicle.airConditioning ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                {vehicle.ratings.length > 0 ? 
                  (vehicle.ratings.reduce((a, b) => a + b, 0) / vehicle.ratings.length).toFixed(1) : 'N/A'}
              </TableCell>
              <TableCell>
                <Button onClick={() => deleteVehicle(vehicle.id)} variant="contained" color="secondary">
                  Delete
                </Button>
                <Button onClick={() => handleEditClick(vehicle)} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editVehicle && (
        <Modal
          open={Boolean(editVehicle)}
          onClose={handleCloseModal}
          aria-labelledby="edit-vehicle-modal"
          aria-describedby="edit-vehicle-modal-description"
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: 400, 
              bgcolor: 'background.paper', 
              boxShadow: 24, 
              p: 4 
            }}
          >
            <h2>Edit Vehicle</h2>
            <form>
              <TextField 
                label="Model" 
                value={editVehicle.model} 
                onChange={(e) => setEditVehicle({ ...editVehicle, model: e.target.value })} 
                fullWidth 
                margin="normal"
              />
              <TextField 
                label="Year" 
                value={editVehicle.year} 
                onChange={(e) => setEditVehicle({ ...editVehicle, year: e.target.value })} 
                fullWidth 
                margin="normal"
              />
              <TextField 
                label="Price Per Day" 
                value={editVehicle.pricePerDay} 
                onChange={(e) => setEditVehicle({ ...editVehicle, pricePerDay: e.target.value })} 
                fullWidth 
                margin="normal"
              />
              <FormControlLabel 
                control={<Checkbox 
                  checked={editVehicle.airConditioning} 
                  onChange={(e) => setEditVehicle({ ...editVehicle, airConditioning: e.target.checked })} 
                />} 
                label="Air Conditioning" 
              />
              <Button 
                onClick={handleSaveChanges} 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '20px' }}
              >
                Save Changes
              </Button>
            </form>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

export default VehicleList;





