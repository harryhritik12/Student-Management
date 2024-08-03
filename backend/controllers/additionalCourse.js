// Import necessary modules and models
import express from 'express';

import AdditionalCourse from '../models/additionalCourse.js';
import Student from '../models/student.js';
import Faculty from '../models/faculty.js';


const isComplete = (course) => {
  if (course.status === 'Completed') {
    return true;
  }
  else {
    return false;
  }
}

// do update things

const setStatus = async (course) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const startdate = course.startDate.split("-");
  const enddate = course.endDate.split("-");

  if (year < parseInt(startdate[0]) ||
      (year === parseInt(startdate[0]) && month < parseInt(startdate[1])) ||
      (year === parseInt(startdate[0]) && month === parseInt(startdate[1]) && day < parseInt(startdate[2]))) {
    course.status = "Comming Soon!";
  }
  else if ((year > parseInt(startdate[0]) || month > parseInt(startdate[1]) || day >= parseInt(startdate[2])) &&
           (year < parseInt(enddate[0]) || month < parseInt(enddate[1]) || day <= parseInt(enddate[2]))) {
    course.status = "Ongoing";
  }
  else {
    course.status = "Completed";
  }
  await course.save();
}


export const getAllAdditionalCourses = async (req, res) => {
  try {

    let additionalCourses = await AdditionalCourse.find();
    additionalCourses.map((course) => setStatus(course));
    res.status(200).json(additionalCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Route to get a specific additional course by ID
export const getAdditionalCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId
    const additionalCourse = await AdditionalCourse.findById(courseId);
    setStatus(additionalCourse);
    if (!additionalCourse) {
      return res.status(404).json({ error: 'Additional Course not found' });
    }

    res.status(200).json(additionalCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Route to register for an additional course
export const registerToAdditionalCourse = async (req, res) => {
  try {
    const rollNumber = req.params.id;
    const courseID = req.params.courseId;

    // Check if the user exists
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if the course exists
    const additionalCourse = await AdditionalCourse.findOne({ courseID });
    if (!additionalCourse) {
      return res.status(404).json({ error: 'Additional Course not found' });
    }

    if (isComplete(additionalCourse)) {
      return res.status(400).json({ message: 'Cannot register for a completed course' });
    }

    // Check if there are available seats in the course
    if (additionalCourse.availableSeats <= 0) {
      return res.status(400).json({ message: 'No available seats in the course' });
    }

    // Check if the user is already registered for the course
    if (student.enrolledCourses.includes(courseID)) {
      return res.status(400).json({ error: 'User is already registered for the course' });
    }

    // Register the user for the course
    student.enrolledCourses.push(courseID);
    await student.save();

    // Decrease the available seats in the course
    additionalCourse.availableSeats -= 1;
    await additionalCourse.save();

    res.status(201).json({ message: 'User registered for the additional course successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Route to unregister from an additional course
export const unregisterToAdditionalCourse = async (req, res) => {
  try {
    const rollNumber = req.params.id;
    const courseID = req.params.courseId;

    // Check if the user exists
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if the course exists
    const additionalCourse = await AdditionalCourse.findOne({ courseID });
    if (!additionalCourse) {
      return res.status(404).json({ error: 'Additional Course not found' });
    }

    // Check if the user is registered for the course
    if (!student.enrolledCourses.includes(courseID)) {
      return res.status(400).json({ error: 'Student is not registered for the course' });
    }

    // Unregister the user from the course
    student.enrolledCourses = student.enrolledCourses.filter(course => course !== courseID);
    await student.save();

    // Increase the available seats in the course
    additionalCourse.availableSeats += 1;
    await additionalCourse.save();

    res.status(200).json({ message: 'Student unregistered from the additional course successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Route to add a new additional course
export const addAdditionalCourse = async (req, res) => {
  try {
    // Extract additional course details from the request body
    const facultyID = req.params.id;
    const courseName = req.body.courseName;
    const courseID = req.body.courseID;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const totalSeats = req.body.totalSeats;
    const day = req.body.day;
    const venue = req.body.venue;
    const timing = req.body.timing;

    console.log(facultyID);
    const faculty = await Faculty.findOne({ facultyID });
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    faculty.releasedCourses.push(courseID);
    await faculty.save();

    // Create a new additional course instance
    const newAdditionalCourse = new AdditionalCourse({
      facultyID,
      courseName,
      courseID,
      description,
      startDate,
      endDate,
      totalSeats,
      availableSeats: totalSeats,
      day,
      venue,
      timing,
    });



    // Save the additional course to the database
    await newAdditionalCourse.save();


    res.status(201).json({ message: 'Additional course added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Route to delete an additional course
export const deleteAdditionalCourse = async (req, res) => {
  try {
    const id = req.params.courseId;

    // Check if the course exists
    const additionalCourse = await AdditionalCourse.findById({_id:id});
    if (!additionalCourse) {
      return res.status(404).json({ error: 'Additional Course not found' });
    }
    // Delete the additional course
    await AdditionalCourse.deleteOne(additionalCourse);

    res.status(200).json({ message: 'Additional course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAllStudentRegisteredCourse = async (req, res) => {
  try {
    const rollNumber = req.params.id;
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const allRegisteredCourseId = student.enrolledCourses;
    const allRegisteredCourse = await AdditionalCourse.find({ courseID: { $in: allRegisteredCourseId } });
    if (!allRegisteredCourse) {
      return res.status(404).json({ error: 'Registered Course not found' });
    }
    res.status(200).json(allRegisteredCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Route to get all courses registered by a faculty
export const getAllCoursesByFacultyId = async (req, res) => {
  try {
    const facultyID = req.params.id;

    // Check if the faculty exists
    const faculty = await Faculty.findOne({ facultyID });
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    // Find all courses with the provided faculty ID
    const allCourses = await AdditionalCourse.find({ facultyID });
    if (!allCourses || allCourses.length === 0) {
      return res.status(404).json({ error: 'No courses found for the faculty' });
    }

    res.status(200).json(allCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


/**  The $in operator in MongoDB is used to specify an array of possible values for a field. */