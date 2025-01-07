import { Router } from "express";
const router = Router();

import { get } from "../controllers/search.ts";

router.get("/", get);

export default router;