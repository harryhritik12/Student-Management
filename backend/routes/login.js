import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import StudentModel from "../models/student.js";
import FacultyModel from "../models/faculty.js";
import StaffModel from "../models/staff.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        let student = await StudentModel.findOne({ email });
        if (student) {
            // Compare the provided password with the stored hashed password
            const match = await bcrypt.compare(password, student.password);

            if (match) {
                const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
                delete student.password;
                return res.json({ token: token, user: student, type: "student"});
            }
        }

        let faculty = await FacultyModel.findOne({ email });
        if (faculty) {
            // Compare the provided password with the stored hashed password
            const match = await bcrypt.compare(password, faculty.password);
            if (match) {
                const token = jwt.sign({ id: faculty._id }, process.env.JWT_SECRET);
                delete faculty.password;
                return res.json({ token: token, user: faculty, type: "faculty" });
            }
        }

        let staff = await StaffModel.findOne({ email });
        if (staff) {
            // Compare the provided password with the stored hashed password
            const match = await bcrypt.compare(password, staff.password);
            if (match) {
                const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET);
                delete staff.password;
                return res.json({ token: token, user: staff , type: "staff"});
            }
        }

        res.status(404).json({ error: 'Invalid email or password' });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
