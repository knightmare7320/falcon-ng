import { Router } from "express";
const router = Router();

import { getPerf, get } from "../controllers/bscs.ts";

router.get("/perf/:mscId?", getPerf);
router.get("/:mscId?", get);

export default router;