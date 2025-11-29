// import {onboardingModel} from "../models/onboarding.model.js";

export const empOnBoarding = async (req,res) => {
    try{
        const {title,  Description} = req.body;
        if(!title || !Description) {
            return res.status(400).json({message:"title wrong"})
        }
        return res.status(200).json({message:"title ok"});

    }
    catch(err){
        res.status(500).json({message:"onboarding 500 status"})
    }
}
export const empOnBoardingCreate = async (req, res) => {
  try {
   const { title, description } = req.body;

   if (!title || !description) {
     return res.status(400).json({
       message: "Title and Description are required",
       errors: {
         title: !title ? "Title is required" : undefined,
         description: !description ? "Description is required" : undefined,
       },
     });
   }

   if (typeof title !== "string" || typeof description !== "string") {
     return res.status(400).json({
       message: "Both fields must be strings",
       errors: {
         title:
           typeof title !== "string" ? "Title must be a string" : undefined,
         description:
           typeof description !== "string"
             ? "Description must be a string"
             : undefined,
       },
     });
   }

   const titleLen = title.trim().length;
   const descLen = description.trim().length;

   let errors = {};

   if (titleLen < 5) {
     errors.title = "Title must be at least 5 characters";
   }
   if (titleLen > 15) {
     errors.title = "Title must be less than 15 characters";
   }

   if (descLen < 5) {
     errors.description = "Description must be at least 5 characters";
   }
   if (descLen > 15) {
     errors.description = "Description must be less than 15 characters";
   }

   if (Object.keys(errors).length > 0) {
     return res.status(400).json({
       message:
         Object.keys(errors).length === 2
           ? "Title and Description are invalid"
           : errors.title
           ? errors.title
           : errors.description,
       errors,
     });
   }

   return res.status(200).json({
     message: "Validation passed",
     errors: {},
   }); 
} 
  catch (err) {
    res.status(500).json({ message: "onboarding status 500" });
  }
};