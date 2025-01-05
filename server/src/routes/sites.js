import { Router } from "express";
const router = Router();

import { getPerf } from "../controllers/sites.js";

router.get("/perf", getPerf);

export default router;