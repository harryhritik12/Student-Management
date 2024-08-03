import express from 'express';
const router = express.Router();
import { verifyToken } from '../middleware/auth.js';

// Profile Controller
import { getStaffProfile } from '../controllers/profile.js';
router.get('/:id/profile', verifyToken, getStaffProfile);

// Announcement Controllers
import { createAnnouncement, getAllAnnouncements, getAnnouncementById, deleteAnnouncement } from '../controllers/announcement.js';
router.post('/:id/announcement/submit', verifyToken, createAnnouncement);
router.get('/:id/announcement/all', verifyToken, getAllAnnouncements);
router.get('/:id/announcement/:announcementId', verifyToken, getAnnouncementById);
router.patch('/:id/announcement/delete/:announcementID', verifyToken, deleteAnnouncement);

// Timetable Controllers
import { getAllTimetables, createTimetable, getTimetableById, deleteTimetable } from '../controllers/timeTable.js';
router.post('/:id/timetable/create', verifyToken, createTimetable);
router.get('/:id/timetable/all', verifyToken, getAllTimetables);
router.get('/:id/timetable/:timetableID', verifyToken, getTimetableById);
router.patch('/:id/timetable/delete/:timetableID', verifyToken, deleteTimetable);

// eComplaint Controllers
import { getAllComplaints, getComplaintById, updateStatus, sendOTP, deleteComplaintById } from '../controllers/eComplaint.js';
router.get('/:id/eComplaint/all', verifyToken, getAllComplaints);
router.get('/:id/eComplaint/:complaintID', verifyToken, getComplaintById);
router.patch('/:id/eComplaint/:complaintID/update', verifyToken, updateStatus);
router.post('/:id/eComplaint/:complaintID/otp', verifyToken, sendOTP);
router.get('/:id/eComplaint/delete/:complaintID', verifyToken, deleteComplaintById);

export default router;
