import React from 'react';
import { PersistentDrawerLeft } from '../../components/faculty/navbar';
import { Box, TextField, Button, Typography, useTheme, useMediaQuery, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useNavigate, json } from 'react-router-dom';


export const AddCourses = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user.facultyID);
    const navigate = useNavigate();

    const initialValues = {
        courseName: '',
        courseID: '',
        description: '',
        startDate: '',
        endDate: '',
        totalSeats: '',
        venue: '',
        timing: '',
        day: [] // Since day is an array
    };

    const validationSchema = Yup.object().shape({
        courseName: Yup.string().required('Course Name is required'),
        courseID: Yup.string().required('Course ID is required'),
        description: Yup.string().required('Description is required'),
        startDate: Yup.string().required('Start Date is required'),
        endDate: Yup.string().required('End Date is required'),
        totalSeats: Yup.number().required('Total Seats is required').positive('Total Seats must be positive'),
        venue: Yup.string().required('Venue is required'),
        timing: Yup.string().required('Timing is required'),
        day: Yup.array().required('At least one day is required').min(1, 'At least one day is required')
    });

    const onSubmit = async (values) => {
        try {
            // Create a JSON object from form values
            const requestData = {
                courseName: values.courseName,
                courseID: values.courseID,
                description: values.description,
                startDate: values.startDate,
                endDate: values.endDate,
                totalSeats: values.totalSeats,
                venue: values.venue,
                timing: values.timing,
                day: values.day
            };
            const response = await fetch(`http://localhost:3001/faculty/${userId}/additionalCourse/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Failed to add new course');
            }

            console.log('Course added successfully');
            navigate(`faculty/${userId}/additionalCourse/all`)
        } catch (error) {
            console.error('Error submitting form:', error.message);
            alert(error.message);
        }
    };


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <Box>
            <PersistentDrawerLeft />
            <Box
                width="100%"
                padding="2rem 17%"
            >
                <WidgetWrapper>
                    <Box m={2}
                    >
                        <Typography color="#00D5FA"
                            fontSize="1.85rem"
                            fontWeight="500"
                            align='center'
                            mb="2rem"
                        >
                            Create Additional Course
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                                }}>
                                <TextField
                                    fullWidth
                                    id="courseName"
                                    name="courseName"
                                    label="Course Name"
                                    value={formik.values.courseName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.courseName && Boolean(formik.errors.courseName)}
                                    helperText={formik.touched.courseName && formik.errors.courseName}
                                />
                                <TextField
                                    fullWidth
                                    id="courseID"
                                    name="courseID"
                                    label="Course ID"
                                    value={formik.values.courseID}
                                    onChange={formik.handleChange}
                                    error={formik.touched.courseID && Boolean(formik.errors.courseID)}
                                    helperText={formik.touched.courseID && formik.errors.courseID}
                                />
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={formik.values.startDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                    helperText={"Start Date" || (formik.touched.startDate && formik.errors.startDate)}
                                />
                                <TextField
                                    fullWidth
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={formik.values.endDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                    helperText={"End Date" || (formik.touched.endDate && formik.errors.endDate)}
                                />
                                <TextField
                                    fullWidth
                                    id="totalSeats"
                                    name="totalSeats"
                                    label="Total Seats"
                                    type="number"
                                    value={formik.values.totalSeats}
                                    onChange={formik.handleChange}
                                    error={formik.touched.totalSeats && Boolean(formik.errors.totalSeats)}
                                    helperText={formik.touched.totalSeats && formik.errors.totalSeats}
                                />
                                <TextField
                                    fullWidth
                                    id="venue"
                                    name="venue"
                                    label="Venue"
                                    value={formik.values.venue}
                                    onChange={formik.handleChange}
                                    error={formik.touched.venue && Boolean(formik.errors.venue)}
                                    helperText={formik.touched.venue && formik.errors.venue}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    id="timing"
                                    name="timing"
                                    label="Timing"
                                    value={formik.values.timing}
                                    onChange={formik.handleChange}
                                    error={formik.touched.timing && Boolean(formik.errors.timing)}
                                    helperText={formik.touched.timing && formik.errors.timing}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <Box
                                    gridColumn="span 2"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <TextField
                                        id="day"
                                        name="day"
                                        label="Days"
                                        select
                                        SelectProps={{ multiple: true }}
                                        fullWidth
                                        value={formik.values.day}
                                        onChange={formik.handleChange}
                                        error={formik.touched.day && Boolean(formik.errors.day)}
                                        helperText={formik.touched.day && formik.errors.day}
                                    >
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                            <MenuItem key={day} value={day}>
                                                {day}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Button
                                    type="submit"
                                    sx={{
                                        gridColumn: "span 2",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main },
                                    }}>CREATE</Button>
                            </Box>
                        </form>
                    </Box>
                </WidgetWrapper>

            </Box>
        </Box>
    );
};

