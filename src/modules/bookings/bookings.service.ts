import moment from "moment";
import { pool } from "../../config/db";



const createBooking = async (customer_id: number, vehicle_id: number, rent_start_date: Date, rent_end_date: Date) => {
    try {

        // Fetch vehicle
        const vehicle = await pool.query(
            `SELECT * FROM vehicles WHERE id = $1`,
            [vehicle_id]
        );

        const customer = await pool.query(
            `SELECT name, email FROM users WHERE id = $1`,
            [customer_id]
        );

        const vehicleData = {
            vehicle_name: vehicle.rows[0].vehicle_name,
            registration_number: vehicle.rows[0].registration_number
        }

        const customerData = {
            name: customer.rows[0].name,
            email: customer.rows[0].email
        }


        const totalDay = moment(rent_end_date).diff(rent_start_date, 'days');
        const totalPrice = vehicle.rows[0].daily_rent_price * totalDay;

        const rental = await pool.query(
            `INSERT INTO bookings 
                (customer_id, vehicle_id, rent_start_date, rent_end_date, status , total_price , customer , vehicle) 
                VALUES ($1, $2, $3, $4, 'active', $5, $6, $7)
                RETURNING *`,
            [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice, customerData, vehicleData]
        );

        delete rental.rows[0].customer

        return rental.rows[0]

    } catch (error: any) {
        throw new Error(error.message);
    }
};

const adminSeeAllCustomerSeeOne = async (role: string, id: number) => {
    // if role is admin then can see all but if role is customer then can only see own bookings
    if (role === "admin") {
        const result = await pool.query(`SELECT * FROM bookings`)
        return result.rows
    }
    else if (role === "customer") {
        const result = await pool.query(`SELECT * FROM bookings WHERE customer_id = $1`, [id])
        delete result.rows[0].customer

        return result.rows
    }
    return []
}

const updateBookingById = async (bookingId: number, status: string) => {
    
}


export const bookingService = { createBooking, adminSeeAllCustomerSeeOne, updateBookingById };