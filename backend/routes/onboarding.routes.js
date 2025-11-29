
import { Router } from "express";
import { formSchemaHandler } from "./form.routes.js";

const router = Router();
router.get("/formschema",formSchemaHandler);

export default router;
