import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import loginRoutes from './routes/login.js';
import registerRoutes from './routes/register.js';
import studentRoutes from './routes/student.js';
import facultyRoutes from './routes/faculty.js';
import staffRoutes from './routes/staff.js';
import { submitComplaint } from "./controllers/eComplaint.js";
import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";
import { verifyToken } from "./middleware/auth.js";
import { createAnnouncement } from "./controllers/announcement.js";

const app = express();
dotenv.config();
app.use(express.json());

// ✅ Use CORS Middleware Properly
const allowedOrigins = [
  'https://campussync.netlify.app',
  'http://localhost:3000',
  'https://student-management-2fbi-git-main-hritiks-projects-bf614864.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Handle Preflight Requests Correctly
app.options('*', cors());

// ✅ Connect to MongoDB
const uri = process.env.MONGODB_ATLAS_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { 
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
    console.log("✅ Connected to MongoDB successfully!");
  })
  .catch(error => console.error("❌ MongoDB Connection Error:", error));

// ✅ File Handling Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    files: 5
  },
});

// ✅ Define Routes
app.post('/student/:id/eComplaint/submit', verifyToken, upload.single('picture'), submitComplaint);
app.post('/staff/:id/announcement/create', verifyToken, upload.array('file', 5), createAnnouncement);

app.use('/auth', loginRoutes);
app.use('/signup', registerRoutes);
app.use('/student', studentRoutes);
app.use('/faculty', facultyRoutes);
app.use('/staff', staffRoutes);

// ✅ Handle 404 Errors
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
