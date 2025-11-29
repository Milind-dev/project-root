import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import employeeOnboardingRoutes from "./routes/onboarding.routes.js"

// .env file
dotenv.config(); // Load .env file
const PORT = process.env.PORT || 8000;
const allowedOrigins = ["http://localhost:3000", "https://your-company.com"];

const app = express();
app.use(express.json());

// connection database
connectDB();

// whenever use frontend that time use
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/api", employeeOnboardingRoutes);


//server start
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
