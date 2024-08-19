import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button} from "@mui/material";

function VehicleList({vehicles, deleteVehicle, updateVehicle}){
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Price Per Day</TableCell>
                    <TableCell>Air Conditioning</TableCell>
                    <TableCell>Available</TableCell>
                    <TableCell>Average Rating</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {vehicles.sort((a, b) => a.model.localeCompare(b.model)).map(vehicle => (
                    <TableRow key={vehicle.id}>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>{vehicle.year}</TableCell>
                        <TableCell>{vehicle.pricePerDay}</TableCell>
                        <TableCell>{vehicle.airConditioning ? "Yes" : "No"}</TableCell>
                        <TableCell>{vehicle.available ? "Yes" : "No"}</TableCell>
                        <TableCell>
                            {vehicle.ratings.length > 0 ?
                                (vehicle.ratings.reduce((a, b) => a + b, 0) / vehicle.ratings.length).toFixed(1) : "N/A"}
                        </TableCell>
                        <TableCell>
                            <button onClick={() => deleteVehicle(vehicle.id)} variant="contained" color="secondary">
                                Delete
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default VehicleList;