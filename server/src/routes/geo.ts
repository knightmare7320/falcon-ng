import { Router } from "express";
const router = Router();

import { getSiteTiles, getSiteBounds, getSectorTiles, getSectorBounds, getSiteJson } from "../controllers/geo.ts";

router.get("/tile/sites/:Z/:X/:Y", getSiteTiles);
router.get("/bounds/sites", getSiteBounds);
router.get("/tile/sectors/:Z/:X/:Y", getSectorTiles);
router.get("/bounds/sectors", getSectorBounds);

router.get("/json/sites/:Z/:X/:Y", getSiteJson);

export default router;