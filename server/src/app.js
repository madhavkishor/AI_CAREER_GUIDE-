const express = require("express");
const morgan = require("morgan");
const jobRoutes = require("./routes/jobRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-career-guide-7e48.onrender.com"
];

// Setup CORS with options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// ✅ Final fix for Express 5 & Node 22
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to server" });
});

app.get("/info", (req, res) => {
  res.json({
    message: "This project is about finding the perfect jobs for you using the AI search.",
    Problem:
      "Navigating countless tech careers is confusing. It's difficult to know which skills are required for a specific role and manually tailoring a resume for each application is tedious. This uncertainty creates a major challenge for job seekers.",
    The_Solution:
      "This system acts as a personal career assistant. It provides personalized career suggestions based on your skills, analyzes your resume to highlight your strengths, and empowers you to make data-driven decisions for your future.",
    Main_motto: "To get the job by entering your skills and related analysis.",
    Process:
      "To get started with this: 1) The user uploads their resume, 2) The resume gets parsed, 3) Details are sent to the backend for AI skills filtering, 4) Results are displayed with recommendations."
  });
});

module.exports = app;
