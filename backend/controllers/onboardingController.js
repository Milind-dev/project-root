import onboardingModel from "../models/onboarding.model.js";

// 
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
        success: false,
      });
    }

    const saved = await validationCheck.save();

    return res.status(201).json({
      message: "Created successfully",
      data: saved,
      success: "false",
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
};1

export const empOnBoardingPage = async (req, res) => {

  try {
    const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 10;
    // const pages = (page - 1) * limit;

    const total = await onboardingModel.countDocuments();
    const sortOrder = req.query.sort === "asc" ? -1:1;
    

    const skipingpage = (page, limit) => {
      if (!page || page < 1) page = 1;
      if (!limit || limit < 1) limit = 10;
       return (page - 1) * limit;
    };

    const data = await onboardingModel
      .find()
      // .sort({ createdAt: -1 }) //see older one to newer one
      // .sort(sortOrder)
      .sort({ createdAt: sortOrder }) 

      .skip(skipingpage(page, limit))
      .limit(limit)
      .lean(); //lean increase performance 2 to 3 times findind


    return res.status(200).json({
      message: "Fetched onboarding forms",
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      count: data.length,
      sortOrder,
      data,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "server status 500 error", error: err.message });
  }
};

export const empOnBoardingGet = async (req, res) => {
  try {
    const data = await onboardingModel.find(); 

    return res.status(200).json({
      message: "All EmpOnboarding Data",
      count: data.length,
      data,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "server status 500 error", error: err.message });
  }
};

// export const empOnBoardingGet = async (req, res) => {
//   try {
//     const { title, Description } = req.body;
//     if (!title || !Description) {
//       return res.status(400).json({ message: "title wrong" });
//     }
//     return res.status(200).json({ message: "title ok" });
//   } catch (err) {
//     res.status(500).json({ message: "onboarding 500 status" });
//   }
// };