import express from "express";
import { who } from "../controllers/user/who.js";

const router = express.Router();

router.get('/who', who);

export default router;