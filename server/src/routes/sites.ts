import { Router } from "express";
const router = Router();

import { getPerf } from "../controllers/sites.ts";

router.get("/perf", getPerf);

export default router;