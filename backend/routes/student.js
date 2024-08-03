// Import necessary modules and controllers
import express from 'express';
import { verifyToken } from '../middleware/auth.js';

import {
  getAllStudentComplaints,
  getComplaintById
} from '../controllers/eComplaint.js';

import {
  getAllAdditionalCourses,
  getAdditionalCourseById,
  registerToAdditionalCourse,
  unregisterToAdditionalCourse,
  getAllStudentRegisteredCourse
} from '../controllers/additionalCourse.js';

import {getStudentProfile} from '../controllers/profile.js';

import { getTimetable } from '../controllers/timeTable.js';
import { getAllAnnouncements, getAnnouncementById } from '../controllers/announcement.js';

const router = express.Router();

/* READ */

// student Controllers
router.get('/:id/profile', verifyToken,getStudentProfile);

router.post('/:id/timetable', verifyToken, getTimetable);
// eComplaint Controllers
router.get('/:id/eComplaint/all', verifyToken, getAllStudentComplaints);
router.get('/:id/eComplaint/:complaintID', verifyToken, getComplaintById);


// additionalCourses Controllers
router.get('/:id/additionalCourse/all', verifyToken, getAllAdditionalCourses);
router.get('/:id/additionalCourse/registered', verifyToken, getAllStudentRegisteredCourse);
router.get('/:id/additionalCourse/:courseId', verifyToken, getAdditionalCourseById);


router.get('/:id/announcement/all', verifyToken, getAllAnnouncements);
router.get('/:id/announcement/:announcementId', verifyToken, getAnnouncementById);


/* POST */

// additionalCourses Controllers
router.patch('/:id/additionalCourse/register/:courseId', verifyToken, registerToAdditionalCourse);
router.patch('/:id/additionalCourse/unregister/:courseId', verifyToken, unregisterToAdditionalCourse);

export default router;