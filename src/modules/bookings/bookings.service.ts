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
            registration_number: vehicle.rows[0].registration_number,
            availability_status: vehicle.rows[0].availability_status,
            type: vehicle.rows[0].type
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
        delete rental.rows[0].vehicle.availability_status
        delete rental.rows[0].vehicle.type

        return await rental.rows[0]

    } catch (error: any) {
        throw new Error(error.message);
    }
};

const adminSeeAllCustomerSeeOne = async (role: string, id: number) => {
    // if role is admin then can see all but if role is customer then can only see own bookings
    if (role === "admin") {
        const result = await pool.query(`SELECT * FROM bookings`)

        for (let i = 0; i < result.rows.length; i++) {
            delete result.rows[i].vehicle.availability_status
            delete result.rows[i].vehicle.type
        }
        const data = await result.rows

        return data
    }
    else if (role === "customer") {
        const result = await pool.query(`SELECT * FROM bookings WHERE customer_id = $1`, [id])

        for (let i = 0; i < result.rows.length; i++) {
            delete result.rows[i].customer
            delete result.rows[i].vehicle.availability_status
        }
        const data = await result.rows

        return data
    }
    return []
}

// Access: Role-based
// Description: Update booking status based on user role and business rules


const updateBookingById = async (bookingId: any, status: string, role: string) => {
    const statusData = {
        status
    }
    if (status === "cancelled" && role === "admin") {
        throw new Error('Only can cancelled by customer')
    }
    if (status === "returned" && role === "customer") {
        throw new Error('Only can returned by admin')
    }

    if (status === "cancelled" && role === "customer") {
        const result = await pool.query(`UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`, [status, bookingId])

        delete result.rows[0].vehicle
        delete result.rows[0].customer

        return result.rows[0]
    }
    else if (status === "returned" && role === "admin") {
        const result = await pool.query(`UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`, [status, bookingId])
        await pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING *`, [result.rows[0].vehicle_id])

        delete result.rows[0].customer

        return await result.rows[0]
    }

    return []

}


export const bookingService = { createBooking, adminSeeAllCustomerSeeOne, updateBookingById };