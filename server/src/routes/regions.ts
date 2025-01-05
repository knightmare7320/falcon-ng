import { Router } from "express";
const router = Router();

import { getPerf, get } from "../controllers/regions.ts";

router.get("/perf", getPerf);
router.get("/", get);

export default router;