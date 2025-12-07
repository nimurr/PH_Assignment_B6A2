import { Request, Response } from "express"
import { bookingService } from "./bookings.service";
import { JwtPayload } from "jsonwebtoken";


const createBooking = async (req: Request, res: Response) => {

    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    try {
        const result = await bookingService.createBooking(customer_id, vehicle_id, rent_start_date, rent_end_date);
        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }

}

const adminSeeAllCustomerSeeOne = async (req: Request, res: Response) => {

    const { role, id } = req.user as JwtPayload

    try {
        const result = await bookingService.adminSeeAllCustomerSeeOne(role, id);
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
    catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateBookingById = async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const { role } = req.user as JwtPayload;
    const { status } = req.body;

    try {
        const result = await bookingService.updateBookingById(bookingId, status, role);
        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }

}


export const bookingController = {
    createBooking,
    adminSeeAllCustomerSeeOne,
    updateBookingById
}