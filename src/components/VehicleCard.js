import React from "react";
import { Card, CardContent, Typography} from "@mui/material";

function VehicleCard({vehicles}){
    const topRatedVehicles = vehicles
    .filter(v => v.ratings.length > 0)
    .sort((a, b) =>
        (b.ratings.reduce((acc, cur) => acc + cur, 0) / b.ratings.length) -
        (a.ratings.reduce((acc, cur) => acc + cur, 0) / a.ratings.length)
    ).slice(0, 3);

    return(
        <div>
            {topRatedVehicles.map(vehicle => (
                <Card key={vehicle.id} style={{ margin: '1em' }}>
                    <CardContent>
                        <Typography variant="h5">{vehicle.model}</Typography>
                        <Typography>Year: {vehicle.year}</Typography>
                        <Typography>Price Per Day: ${vehicle.pricePerDay}</Typography>
                        <Typography>Air Conditioning: {vehicle.airConditioning ? "Yes" : "No"}</Typography>
                        <Typography>Average Rating:
                            {(vehicle.ratings.reduce((acc, cur) => acc + cur, 0) / vehicle.ratings.length).toFixed(1)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default VehicleCard;