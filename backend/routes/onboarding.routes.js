
import { Router } from "express";
import { empOnBoarding, empOnBoardingCreate } from "../controllers/onboardingController.js";

const router = Router();
router.get("/formschema", empOnBoarding);
router.post("/formschemaCreate", empOnBoardingCreate);


export default router;
