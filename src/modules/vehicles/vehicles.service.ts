import { pool } from "../../config/db"


const createVehicle = async (vehicle_name: string, type: string, registration_number: string, daily_rent_price: number, availability_status: string) => {

    const result = await pool.query(` INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *
    ` , [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    console.log(result)

    return result.rows[0]
}

const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`)

    return result.rows
}


const getVehiclesById = async (vehicleId: number | string) => {
    const findIfExist = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId])
    if (findIfExist.rows.length < 1) {
        throw new Error('Vehicle not found')
    }

    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId])

    return result.rows[0]

}

const updateVehiclesById = async (
    vehicleId?: number | string,
    vehicle_name?: string,
    type?: string,
    registration_number?: string,
    daily_rent_price?: number,
    availability_status?: string
) => {

    const findIfExist = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    if (findIfExist.rows.length < 1) {
        throw new Error("Vehicle not found");
    }

    const result = await pool.query(
        `
    UPDATE vehicles 
    SET 
      vehicle_name = COALESCE($1, vehicle_name),
      type = COALESCE($2, type),
      registration_number = COALESCE($3, registration_number),
      daily_rent_price = COALESCE($4, daily_rent_price),
      availability_status = COALESCE($5, availability_status)
    WHERE id = $6
    RETURNING *
    `,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]
    );

    return result.rows[0];
};


export const vehicleService = {
    createVehicle,
    getAllVehicles,
    getVehiclesById,
    updateVehiclesById
}