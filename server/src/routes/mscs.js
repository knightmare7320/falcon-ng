import { Router } from "express";
const router = Router();

import { getPerf, get } from "../controllers/mscs.js";

router.get("/perf", getPerf);
router.get("/", get);

export default router; 