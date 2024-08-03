import express from "express";
import bcrypt from "bcrypt";
import StudentModel from "../models/student.js";
import FacultyModel from "../models/faculty.js";
import StaffModel from "../models/staff.js";
import nodemailer from 'nodemailer'; // Import for email sending
import otpGenerator from 'otp-generator'; // Import for OTP generation

const router = express.Router();

const transporter = nodemailer.createTransport({
    // Configure your email transport options here
    service: 'Gmail', // Use the appropriate email service provider
    auth: {
        user: 'guptaminshu85@gmail.com', // Your email address
        pass: 'tktn sbod atvl sbbs' // Your email password or app-specific password
    }
});

// Function to generate and send OTP
async function sendOTP(email) {
    const otp = otpGenerator.generate(6, { digits: true });
    try {
        await transporter.sendMail({
            to: email,
            subject: 'Registration OTP',
            text: `Your OTP is ${otp}`
        });
        return otp;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
}


router.post('/student', async (req, res) => {
    try {
        const existingStudent = await StudentModel.findOne({ email: req.body.email });
        const existingRollNumber = await StudentModel.findOne({ rollNumber: req.body.rollNumber });

        if (!existingStudent && !existingRollNumber) {
            // Generate a salt dynamically
            const salt = await bcrypt.genSalt();

            // Hash the password with the dynamically generated salt
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;

            const otp = await sendOTP(req.body.email); // Generate and send OTP

            // Store the OTP in the user object temporarily for authentication
            const student = new StudentModel(req.body);
            student.otp = { code: otp, createdAt: new Date() };
            await student.save()
            .then(student => res.json(student))
            .catch(err => {
                    console.log(err.message);
                    err.status = 400;
                    res.json(err);
            });

        } else {
            res.status(400).json("You have already Registered");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/faculty', async (req, res) => {
    try {
        const existingFaculty = await FacultyModel.findOne({ email: req.body.email });
        const existingFacultyID = await FacultyModel.findOne({ facultyID: req.body.facultyID });

        console.log(existingFaculty);
        console.log(existingFacultyID);

        if (!existingFaculty && !existingFacultyID) {
            // Generate a salt dynamically
            const salt = await bcrypt.genSalt();
            // Hash the password with the dynamically generated salt
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;

            const otp = await sendOTP(req.body.email); // Generate and send OTP
            // Store the OTP in the user object temporarily for authentication
            const faculty = new FacultyModel(req.body);
            faculty.otp = { code: otp, createdAt: new Date() };
            await faculty.save()
            .then(faculty => res.json(faculty))
            .catch(err => {
                    console.log(err.message);
                    err.status = 400;
                    res.json(err);
            });

        } else {
            res.status(400).json("You have already Registered");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/staff', async (req, res) => {
    try {
        const existingStaff = await StaffModel.findOne({ email: req.body.email });
        const existingStaffID = await StaffModel.findOne({ staffID: req.body.staffID });

        if (!existingStaff && !existingStaffID) {
            // Generate a salt dynamically
            const salt = await bcrypt.genSalt();

            // Hash the password with the dynamically generated salt
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;

            const otp = await sendOTP(req.body.email); // Generate and send OTP

            // Store the OTP in the user object temporarily for authentication
            const staff = new StaffModel(req.body);
            staff.otp = { code: otp, createdAt: new Date() };
            await staff.save()
            .then(staff => res.json(staff))
            .catch(err => {
                    console.log(err.message);
                    err.status = 400;
                    res.json(err);
            });

        } else {
            res.status(400).json("You have already Registered");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const authenticateUser = async (_otp) => {

        const student = await StudentModel.findOne({ 'otp.code': _otp });
        
        if(student){
            // console.log(student.otp);
            if (!student.otp || student.otp.code !== _otp || new Date() - student.otp.createdAt > 5 * 60 * 1000) {
                console.log("delete the student");
                await student.deleteOne();
                throw new Error('Invalid or expired OTP');
            }
            student.otp = undefined;
            await student.save();
            return student;
        }

        const faculty = await FacultyModel.findOne({ 'otp.code': _otp });
        if(faculty){
            // console.log(faculty.otp);
            if (!faculty.otp || faculty.otp.code !== _otp || new Date() - faculty.otp.createdAt > 5 * 60 * 1000) {
                await faculty.deleteOne();
                throw new Error('Invalid or expired OTP');
            }
            faculty.otp = undefined;
            await faculty.save();
            return faculty;
        }

        const staff = await StaffModel.findOne({ 'otp.code': _otp });
        if(staff){
            // console.log(staff.otp);
            if (!staff.otp || staff.otp.code !== _otp || new Date() - staff.otp.createdAt > 5 * 60 * 1000) {
                await staff.deleteOne();
                throw new Error('Invalid or expired OTP');
            }
            staff.otp = undefined;
            await staff.save();
            return staff;
        }
        else{
            console.log("No user found");
        }
};



router.post('/authenticate', async (req, res) => {
    try {
        const otp = req.body.otp;
        const user = await authenticateUser(otp);
        if(user){
            res.json({ message: "Authentication successful", user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});



export default router;
