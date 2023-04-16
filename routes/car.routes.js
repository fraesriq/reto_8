
import express from 'express';
import { verifyToken } from '../middlewares/jwt.js';
import { upload } from '../middlewares/upload.js';

import {addCar,editCar,deleteCarById} from '../controllers/car.controller.js';

const router = express.Router();

router.post("/add_car",verifyToken,upload,addCar,(req, res) => { });
router.put("/edit_car",verifyToken,editCar,(req, res) => { });
router.delete("/delete_like",verifyToken,deleteCarById,(req, res) => { });

export default router;
