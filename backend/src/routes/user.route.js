import express from "express";
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

export default router;