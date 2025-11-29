import mongoose from "mongoose";

const onboardingSchema = new mongoose.Schema({
  employee: {
    type: String,
    id: String,
    minlength: 5,
    maxlength: 15,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlenth: 5,
    maxlength: 15,
    trim: true,
  },
  Description: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 15,
    trim: true,
  },
  fields: [
    {
      label: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 15,
      },
      type: String,
      placeholder: {
        type: String,
        minlength: 5,
        maxlength: 15,
      },
      Option: [String],
      validation: {
        required: true,
        minLength: 10,
        maxLength: 10,
        pattern: "^[0-9]+$",
        minDate: "2024-01-01",
        maxDate: "2024-12-31",
      },
      phone: "^[0-9]+$",
    },
  ],
});

export default mongoose.model("onboardingSchema", onboardingSchema);