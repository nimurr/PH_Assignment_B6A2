import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    return result.rows
}

const AdminorOwnProfile = async (customerInfo: any, userId: any, data: any) => {

    const findIfExist = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
    if (findIfExist.rows.length < 1) {
        throw new Error('User not found')
    }

    if (customerInfo.role == "admin" || customerInfo.id == userId) {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
        delete result.rows[0].password
        // result update user    

        if (data.name) result.rows[0].name = data.name
        if (data.email) result.rows[0].email = data.email
        if (data.phone) result.rows[0].phone = data.phone
        if (data.role) result.rows[0].role = data.role

        return result.rows[0]
    }
    else {
        throw new Error('You are not authorized to update this user')
    }

}


export const userService = {
    getAllUsers,
    AdminorOwnProfile

}