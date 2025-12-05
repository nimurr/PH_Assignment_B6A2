import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {

    try {
        const result = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const AdminorOwnProfile = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email, phone, role } = req.body
    const data = { name, email, phone, role };
    const customerInfo = req.user;

    try {
        const result = await userService.AdminorOwnProfile(customerInfo, userId, data);
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteById = async (req: Response, res: Response) => {
    const { userId } = req.params as { userId: string | number };

    try {
        const result = await userService.deleteById(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const userController = {
    getAllUsers,
    AdminorOwnProfile,
    deleteById
}