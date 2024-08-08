import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import loginRoutes from './routes/login.js';
import registerRoutes from './routes/register.js'
import studentRoutes from './routes/student.js'
import facultyRoutes from './routes/faculty.js'
import staffRoutes from './routes/staff.js'
import { submitComplaint } from "./controllers/eComplaint.js";
import {fileURLToPath} from "url";
import multer from "multer";
import path from "path";
import { verifyToken } from "./middleware/auth.js";
import { createAnnouncement } from "./controllers/announcement.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors({origin: process.env.APP_BASE_URL}));

const uri = process.env.MONGODB_ATLAS_URL;
mongoose.connect(uri)
    .then(() => { 
        app.listen(process.env.PORT, () => {
            console.log("listening at port 3001");
        })
        console.log('db successful');

                })
    .catch((error) => { console.log(error) })


const __filemame = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filemame);

app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // limit file size to 5MB
      files: 5
    },
  });


app.post('/student/:id/eComplaint/submit', verifyToken, upload.single('picture'), submitComplaint);
app.post('/staff/:id/announcement/create', verifyToken, upload.array('file',5),createAnnouncement);

app.use('/auth', loginRoutes);

app.use('/signup', registerRoutes);

app.use('/student', studentRoutes);

app.use('/faculty', facultyRoutes);

app.use('/staff', staffRoutes);

app.use((req, res) => {
    res.status(404).send('not found');
})


