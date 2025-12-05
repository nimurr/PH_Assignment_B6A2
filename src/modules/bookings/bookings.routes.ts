import { Request, Response, Router } from "express";
import { auth } from "../../middleware/auth";
const router = Router();

router.post('/', auth("admin", "customer"), );


export const bookingRoutes = router;