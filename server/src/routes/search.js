import { Router } from "express";
const router = Router();

import { get } from "../controllers/search.js";

router.get("/", get);

export default router;