import { Router } from "express";
const router = Router();

import { getPerf, get } from "../controllers/l5Markets.js";

router.get("/perf/:l4MarketId", getPerf);
router.get("/:l4MarketId?", get);

export default router;