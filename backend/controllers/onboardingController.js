import onboardingModel from "../models/onboarding.model.js";

export const empOnBoarding = async (req, res) => {
  try {
    const { title, Description } = req.body;
    if (!title || !Description) {
      return res.status(400).json({ message: "title wrong" });
    }
    return res.status(200).json({ message: "title ok" });
  } catch (err) {
    res.status(500).json({ message: "onboarding 500 status" });
  }
};
export const empOnBoardingCreate = async (req, res) => {
  try {
    const validationCheck = new onboardingModel({
      title: req.body.title,
      description: req.body.description,
      fields: Array.isArray(req.body.fields) ? req.body.fields : [],
    });

    

    //validateSync is use for mongo db errors without use it manually
    const validationError = validationCheck.validateSync();

    if (validationError) {
      const errors = {};

      for (let field in validationError.errors) {
        errors[field] = validationError.errors[field].message;
      }

      return res.status(400).json({
        message: "validation failed",
        errors,
        success:false
      });
    }

    const saved = await validationCheck.save();

    return res.status(201).json({
      message: "Created successfully",
      data: saved,
      success:"false"
    });

    // return res.status(201).json({
    //   message: "Created successfully",
    // });

    /*   if (!title || !description) {
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

   const onbardingDataStore = await onboardingModel.create({title,description});
  */
  } catch (err) {
    res.status(500).json({ message: "onboarding status 500" });
  }
};



export const empOnBoardingGet = async (req, res) => {
  try {
    const data = await onboardingModel.find(); // <-- same as findAll()

    return res.status(200).json({
      message: "All EmpOnboarding Data",
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "Server 500 error", error: err.message });
  }
};