import { userController } from "./user.controller";
import logger from "../../middleware/logger";
import { auth } from "../../middleware/auth";

const express = require("express");
const router = express.Router();

router.get('/', logger, auth("admin"), userController.getAllUsers)
router.put('/:userId', logger, auth("admin", "customer"), userController.AdminorOwnProfile)
router.delete('/:userId', logger, auth("admin"), userController.deleteById)



export const userRoutes = router;