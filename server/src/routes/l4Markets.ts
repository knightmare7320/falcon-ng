import { Router } from "express";
const router = Router();

import { getPerf, get } from "../controllers/l4Markets.ts";

router.get("/perf/:regionId", getPerf);
router.get("/:regionId?", get);

export default router;