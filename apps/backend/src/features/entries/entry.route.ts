import { Router } from "express";
import { getEntriesHandler } from "./entry.controller";

const router = Router();

router.get("/", getEntriesHandler);

export default router;
