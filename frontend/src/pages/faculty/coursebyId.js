import React, { useState, useEffect } from 'react';
import { PersistentDrawerLeft } from '../../components/faculty/navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import WidgetWrapper from '../../components/WidgetWrapper';
import FlexBetween from '../../components/FlexBetween';
import { Typography, Box, useTheme, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import { setEnrolledCourse } from "../../states/index.js";
import DeleteIcon from '@mui/icons-material/Delete';


export const CourseById = () => {
    const { palette } = useTheme();
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const userId = useSelector((state) => state.user.facultyId);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();


    const handleOnClickDelete = async (courseId) => {

        try {
            const response = await fetch(`${process.env.NODE_BACKEND_APP_BASE_URL}/faculty/${userId}/additionalCourse/delete/${courseId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // If the deletion was successful, navigate to the desired page
                console.log('Course deleted successfully');
                navigate(`/faculty/${userId}/additionalCourse/all`);

            } else {
                // If there was an error with the deletion, log the error message
                console.error('Failed to delete the course');
            }
        } catch (error) {
            console.error('Could not delete the course', error);
        }
    };



    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`${process.env.NODE_BACKEND_APP_BASE_URL}/faculty/${courseId}/additionalCourse/${courseId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch course');
                }
                const courseData = await response.json();
                setCourse(courseData);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [courseId]);



    return (
        <Box>
            <PersistentDrawerLeft />
            <Box
                width="100%"
                padding="2rem 17%"
            >
                <WidgetWrapper>
                    <Box m={2}>
                        {course && (
                            <>
                                <FlexBetween mb="1rem">
                                    <Box>
                                        <Typography color="#00D5FA"
                                            fontSize="1.85rem"
                                            fontWeight="500"
                                        >
                                            {course?.courseName}
                                        </Typography>
                                    </Box>
                                    <Typography fontWeight="500" color={course.status === 'Ongoing' ? "lightgreen" : course.status === 'Completed' ? "lightcoral" : "skyblue"}>
                                        {course.status}
                                    </Typography>
                                </FlexBetween>

                                <FlexBetween
                                    bgcolor="#e6f8f9"
                                    p="1rem"
                                    borderRadius="0.5rem"
                                    mb="1rem"
                                >
                                    {course?.description}
                                </FlexBetween>

                                <FlexBetween>
                                    <Box>
                                        <Box display="flex" gap="1rem" m="1.5rem 4rem">
                                            <CalendarMonthIcon />
                                            <Typography>{course?.startDate} ~ {course?.endDate}</Typography>
                                        </Box>
                                        <Box display="flex" gap="1rem" m="1.5rem 4rem">
                                            <RoomRoundedIcon />
                                            <Typography>{course?.venue}</Typography>
                                        </Box>

                                        <Box display="flex" gap="1rem" m="1.5rem 4rem">
                                            <CalendarMonthIcon />
                                            {course?.day.map((day) => <Typography>{day}</Typography>)}
                                        </Box>
                                        <Box display="flex" gap="1rem" m="1.5rem 4rem">
                                            <AccessTimeOutlinedIcon />
                                            <Typography>{course?.timing}</Typography>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Box display="flex" gap="1rem" m="2rem 4rem 2rem">
                                            <AccessibilityNewRoundedIcon />
                                            <Typography >Seats Left: {course?.availableSeats}</Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Button

                                            onClick={()=>handleOnClickDelete(course?._id)}
                                            sx={{
                                                width: "100%",
                                                p: "1rem",
                                                backgroundColor: "crimson",
                                                color: palette.background.alt,
                                                "&:hover": { color: palette.primary.main },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Box>

                                </FlexBetween>



                            </>
                        )}
                    </Box>

                </WidgetWrapper>
            </Box>
        </Box>
    );
};
