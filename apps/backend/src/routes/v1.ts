import { Router } from "express";
import entryRoutes from "../features/entries/entry.route";

const router = Router();

router.use("/entries", entryRoutes);

export default router;
