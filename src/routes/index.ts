import stores from "./stores";
import auth from "./auth";
import { Router } from "express";
const router = Router();

router.use("/api", stores);
router.use("/auth", auth);

export default router;
