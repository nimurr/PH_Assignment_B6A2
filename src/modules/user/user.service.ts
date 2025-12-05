import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    return result.rows
}

const AdminorOwnProfile = async (customerInfo: any, userId: any, data: any) => {
    const { name, email, phone, role } = data;

    const findIfExist = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
    if (findIfExist.rows.length < 1) {
        throw new Error('User not found')
    }

    if (customerInfo.role == "admin" || customerInfo.id == userId) {
        // update user

        const result = await pool.query(`UPDATE users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING *`, [name, email, phone, role, userId])
        delete result.rows[0].password

        return result.rows[0]
    }
    else {
        throw new Error('You are not authorized to update this user')
    }

}

const deleteById = async (userId: any) => {
    const findIfExist = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
    if (findIfExist.rows.length < 1) {
        throw new Error('User not found')
    }

    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [userId])
    return result.rows
}


export const userService = {
    getAllUsers,
    AdminorOwnProfile,
    deleteById

}