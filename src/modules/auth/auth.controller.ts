import { Request, Response } from "express";
import { authService } from "./auth.service";


const signUp = async (req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body;
    try {
        const result = await authService.signUp(name, email, password, phone, role)

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });

    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const result = await authService.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


export const authController = {
    signUp,
    loginUser
}