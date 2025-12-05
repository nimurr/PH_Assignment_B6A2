import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";


const createVehicle = async (req: Request, res: Response) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;

    try {
        const result = await vehicleService.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);

        res.status(200).json({
            success: true,
            message: "Vehicle created successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getAllVehicles();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



export const vehicleController = {
    getAllVehicles,
    createVehicle
}