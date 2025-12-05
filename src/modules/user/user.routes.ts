import { userController } from "./user.controller";
import logger from "../../middleware/logger";
import { auth } from "../../middleware/auth";

const express = require("express");
const router = express.Router();



export const userRoutes = router;