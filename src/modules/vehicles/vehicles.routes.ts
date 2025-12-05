import { Request, Response, Router } from "express";
import { vehicleController } from "./vehicles.controller";
import { auth } from "../../middleware/auth";
const router = Router();


router.post('/', auth("admin"), vehicleController.createVehicle)
router.get('/', vehicleController.getAllVehicles)
router.get('/:vehicleId', vehicleController.getVehiclesById)
router.put('/:vehicleId', auth("admin"), vehicleController.updateVehiclesById)
router.delete('/:vehicleId', auth("admin"), vehicleController.deleteVehiclesById)


export const vehicleRoutes = router