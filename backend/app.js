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
import TimeTable from './models/timetable.js';
import AdditionalCourseModel from "./models/additionalCourse.js";
import { timetables ,additionalCourseData,announcementData, faculties} from "./data/index.js";
import AnnouncementModel from "./models/announcement.js";
import FacultyModel from "./models/faculty.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());

mongoose.connect("mongodb://localhost:27017/CollegeManagement")
    .then(() => { 
        app.listen(3001, () => {
            console.log("listening at port 3001");
        })
        console.log('db successful');
        // TimeTable.insertMany(timetables);
        //  AdditionalCourseModel.insertMany(additionalCourseData);
        // AnnouncementModel.insertMany(announcementData);
        // FacultyModel.insertMany(faculties);
                })
    .catch((error) => { console.log('db connection failed') })


const __filemame = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filemame);

app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
/* FILE STORAGE */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage ,
    limits: { fileSize: 1024 * 1024 * 5 },});

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


