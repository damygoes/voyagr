import { Router } from "express";
import authRoutes from "../features/auth/auth.routes";
import entryRoutes from "../features/entries/entry.route";

const router = Router();

router.use("/entries", entryRoutes);
router.use("/auth", authRoutes);

export default router;
