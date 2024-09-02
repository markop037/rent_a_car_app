import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

function VehicleCard({ vehicles }) {
    const topRatedVehicles = vehicles
        .filter(v => v.ratings.length > 0)
        .sort((a, b) =>
            (b.ratings.reduce((acc, cur) => acc + cur, 0) / b.ratings.length) -
            (a.ratings.reduce((acc, cur) => acc + cur, 0) / a.ratings.length)
        ).slice(0, 3);

    return (
        <Grid container spacing={3} justifyContent="center">
            {topRatedVehicles.map(vehicle => (
                <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
                    <Card elevation={4} style={{ borderRadius: '12px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                {vehicle.model}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Year: {vehicle.year}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Price Per Day: ${vehicle.pricePerDay}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Air Conditioning: {vehicle.airConditioning ? "Yes" : "No"}
                            </Typography>
                            <Typography variant="h6" style={{ marginTop: '1em' }}>
                                Average Rating: {(vehicle.ratings.reduce((acc, cur) => acc + cur, 0) / vehicle.ratings.length).toFixed(1)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default VehicleCard;
