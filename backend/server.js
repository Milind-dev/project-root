import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeOnboardingRoutes from "./routes/onboarding.routes.js"

// .env file
dotenv.config(); // Load .env file

const PORT = process.env.PORT || 8000;
//port
const app = express();
app.use(express.json());


// connection db
connectDB();

// app.core

app.use("/api", employeeOnboardingRoutes);

//server start
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
