import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  label: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 50,
    trim: true
  },
/* 
  type is special in mongoose that why you cant create dirtectly type:{type:Sting} 
  but create type:String but its not good process to validate */
  type: {
    type: String,
    enum: ["text", "number", "select", "date", "textarea", "switch"],
    required: false
  },

  placeholder: {
    type: String,
    minlength: 0,
    maxlength: 100,
    trim: true
  },

  options: {
    type: [String],
    default: undefined
  },

  validation: {
    required: { type: Boolean, default: false },
    minLength: { type: Number },
    maxLength: { type: Number },
    pattern: { type: String },     // store pattern as string; you can convert to RegExp when using
    minDate: { type: Date },
    maxDate: { type: Date }
  },

  phone: {
    type: String,
    required: false,
    match: /^(\+91)?[6-9][0-9]{9}$/
  }
}, { _id: false }); // optional: don't create an _id for every field object


const onboardingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [15, "itle must be less than 15 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [5, "Description must be at least 5 characters"],
      maxlength: [15, "Description must be less than 15 characters"],
    },
    fields: [fieldSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("onboardingSchema", onboardingSchema);