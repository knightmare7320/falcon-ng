import { Router } from "express";
const router = Router();

import { getPerf, get } from "../controllers/orgClusters.ts";

router.get("/perf/:l5MarketId", getPerf);
router.get("/:l5MarketId?", get);

export default router;