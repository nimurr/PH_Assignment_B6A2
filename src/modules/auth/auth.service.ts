import { pool } from "../../config/db"
import bycrpt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../../config"


const signUp = async (name: string, email: string, password: string, phone: number, role: string) => {

    const salt = await bycrpt.genSalt(10)
    const hash = await bycrpt.hash(password, salt)

    const result = await pool.query(`INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, email, hash, phone, role])

    return result
}


const loginUser = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

    if (result.rows.length === 0) {
        throw new Error('User not found')
    }

    const user = result.rows[0]

    const matchPass = await bycrpt.compare(password, user.password)

    if (!matchPass) {
        throw new Error('Invalid password')
    }

    delete user.password

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, config.jwt_secret, { expiresIn: '7d' })

    console.log(token)

    const results = {
        token,
        user: result.rows
    }

    return results
}

export const authService = {
    signUp,
    loginUser
}