import { Request, Response, Router } from "express";
import { auth } from "../../middleware/auth";
import { bookingController } from "./bookings.controller";
const router = Router();

router.post('/', auth("admin", "customer"), bookingController.createBooking);
router.get('/', auth("admin", "customer"), bookingController.adminSeeAllCustomerSeeOne);


export const bookingRoutes = router;