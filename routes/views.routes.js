import express from "express";
import { verifyToken } from '../middlewares/jwt.js';

const router = express.Router();

import { controllerHome, controllerLogin, controllerRegistro, controllerPublicar} from '../controllers/views.controller.js';

router.get(["/", "home"], controllerHome, (req, res) => { });
router.get(["/login"], controllerLogin, (req, res) => { });
router.get(["/registro"], controllerRegistro, (req, res) => { });
router.get(["/publicar"], verifyToken, controllerPublicar, (req, res) => { });

export default router;