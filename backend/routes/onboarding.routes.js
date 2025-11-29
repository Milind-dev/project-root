
import { Router } from "express";
import {
    empOnBoardingCreate,
    empOnBoardingGet,
    empOnBoardingPage,
} from "../controllers/onboardingController.js";

const router = Router();
router.post("/empFormSchemaCreate", empOnBoardingCreate);
router.get("/empFormSchemaGet", empOnBoardingGet);
router.get("/empFormSchemaGetPages/empFormSchemaGetPages", empOnBoardingPage);

// router.get("/empFormSchema", empOnBoarding);



export default router;
