
import { Router } from "express";
import { empOnBoarding, empOnBoardingCreate, empOnBoardingGet } from "../controllers/onboardingController.js";

const router = Router();
router.post("/empFormSchemaCreate", empOnBoardingCreate);
router.get("/empFormSchemaGet",empOnBoardingGet);
router.get("/empFormSchemaGet/{id}",empOnBoardingGet);

// router.get("/empFormSchema", empOnBoarding);



export default router;
