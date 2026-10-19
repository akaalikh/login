import express from "express";
import { register } from "../controllers/register.js";

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

export default router;