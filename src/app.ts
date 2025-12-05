import express, { NextFunction, Request, Response } from "express";

import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingRoutes } from "./modules/bookings/bookings.routes";

//!Basic Express Setup
const app = express();

app.use(express.json());

//!====== initializing DB ======
initDB()

//! ==== API Testing Route ====
app.get("/", logger, (req: Request, res: Response) => {
    res.status(200).json({
        code: 200,
        status: "success",
        message: "👋 Hello PH developer group!  My API Is Working Perfectly ☺️ "
    });
});


//?======================== Start Routes ====================

//!======= Auth crud =======
app.use('/api/v1/auth', authRoutes)

//!==== All users CRUD ====
app.use("/api/v1/users", userRoutes)

//! ======== vehicles CRUD =======
app.use('/api/v1/vehicles', vehicleRoutes)

//!====== Bookings =======
app.use('/api/v1/bookings', bookingRoutes)


//?======================= End Routes =======================


//!===== Not Found =====
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    });
});




export default app