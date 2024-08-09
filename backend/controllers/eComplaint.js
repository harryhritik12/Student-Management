// Import necessary modules and models
import express from 'express';
import Student from '../models/student.js';
import Staff from '../models/staff.js';
import Complaint from '../models/eComplaint.js';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import { s3UploadPicture } from '../config/s3Service.js';


const transporter = nodemailer.createTransport({
  
  service: 'Gmail', 
  auth: {
      user: 'guptaminshu85@gmail.com', // email address
      pass: 'cccf jlfz ekag vagu' // app-specific password
  }
});


export async function sendOTP(req, res) {
  const complaintID = req.params.complaintID;
  console.log("otp Sent");
  const complaint = await Complaint.findById({_id:complaintID});
  console.log(complaint);
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }
  const otp = otpGenerator.generate(6, { digits: true });
  try {
      await transporter.sendMail({
          to: complaint.email,
          subject: 'Registration OTP',
          text: `Your OTP is ${otp}`
      });
      console.log(otp);
      complaint.otp = otp;
      await complaint.save();
      res.status(200).json({message: "OTP saved successfully"});

  } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
  }
}


// Function to submit a new complaint
export const submitComplaint = async (req, res) => {
  try {
    
    const rollNumber = req.params.id;
    const { email,complainType, title, description, picturePath, contactNumber} = req.body;

    const student = await Student.findOne({rollNumber});
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    const newComplaint = new Complaint({
      email,
      rollNumber,
      complainType,
      contactNumber,
      title,
      description,
      picturePath,
    });


      // const params = {
      //   Bucket: 'chaurasiyabuckets',
      //   Key: req.file.originalname,
      //   Body: req.file.buffer,
      // };
  
      // s3.upload(params);
      // console.log(req);
      
      const picture = req.file;
      
      await s3UploadPicture(picture);
  

    await newComplaint.save();

    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get all complaints
export const getAllComplaints = async (req, res) => {
  try {
    const staffID = req.params.id;
    const staff = Staff.findOne({staffID});
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    
    const complaints = await Complaint.find();

    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAllStudentComplaints = async (req, res) => {
  try {
    
    const rollNumber = req.params.id;
    const student = await Student.findOne({rollNumber});
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const complaints = await Complaint.find({rollNumber:req.params.id});

    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get a specific complaint by ID
export const getComplaintById = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!Staff.findOne({staffID:userID}) && !Student.findOne({rollNumber:userID})) {
      return res.status(404).json({ error: 'User not found' });
    }


    const complaint = await Complaint.findById(req.params.complaintID);
    console.log(complaint);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.status(200).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteComplaintById = async (req, res) => {
  const staffID = req.params.id;
  const complaintID = req.params.complaintID;
  try {
      const staff = Staff.findOne({staffID});
      if (!staff) {
        return res.status(404).json({ error: 'Staff not found' });
      }
      const complaint = await Complaint.findOne(complaintID);
      if (!complaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }
      if (complaint.status === "Successful") {
        await complaint.deleteOne();
        return res.json({ message: "Complaint deleted successfully!" });
      } else {
        return res.status(400).json({ error: "Cannot delete complaint with status other than 'Successful'" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting complaint!" });
  }
};


export const updateStatus = async (req, res) => {
  const staffID = req.params.id;
  const complaintID = req.params.complaintID;
  
  try {
      const staff = Staff.findOne({staffID});
      
      if (!staff) {
        return res.status(404).json({ error: 'Staff not found' });
      }
      const complaint = await Complaint.findById({_id:complaintID});
      
      if (!complaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }
      if(complaint.status=="Pending"){
        complaint.status="Accepted";
        await complaint.save();
        res.json({ message: "Status updated to Accepted" }); 

      }
      else if(complaint.status=="Accepted" && req.body.otp){
        const _otp = req.body.otp;
        const complaint = await authenticate(_otp);
        complaint.status="Successful";
        await complaint.save();
        res.json({ message: "Status updated to Successful" }); 
      }
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting complaint!" });
  }
};



const authenticate = async (_otp) => {

  const complaint = await Complaint.findOne({ otp: _otp });
  if(complaint){
      complaint.otp = undefined;
      await complaint.save();
      return complaint;
  }
};

