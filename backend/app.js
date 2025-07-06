import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
dotenv.config();
// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

// Connect to DB
dbConnection();

// CORS setup
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
