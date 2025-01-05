import { Router } from "express";
const router = Router();

import { getPerf, get } from "../controllers/bscs.js";

router.get("/perf/:mscId?", getPerf);
router.get("/:mscId?", get);

export default router;