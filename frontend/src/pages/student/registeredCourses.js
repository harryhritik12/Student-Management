import React, { useState, useEffect } from 'react';
import { PersistentDrawerLeft } from '../../components/student/navbar.js';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WidgetWrapper from '../../components/WidgetWrapper.js';
import FlexBetween from '../../components/FlexBetween.js';

export const RegisteredCoursePage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const main = palette.primary.main;
  const medium = palette.neutral.medium;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user.rollNumber);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleCourseClick = (courseId) => {
    navigate(`/student/${userId}/additionalCourse/${courseId}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/student/${userId}/additionalCourse/registered`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const coursesData = await Promise.all(
          response.data.map(async course => {
            const facultyProfile = await axios.get(`http://localhost:3001/faculty/${course.facultyID}/profile`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            const facultyName = `${facultyProfile.data.firstName} ${facultyProfile.data.lastName}`;
            return {
              ...course,
              facultyName: facultyName
            };
          })
        );
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box>
      <PersistentDrawerLeft />
      <Box
        width="100%"
        padding="2rem 17%"
      >
        <WidgetWrapper>

          <Box m={2}>
            <Box marginBottom="2rem">
              <Typography color={main}
                variant="h3"
                fontWeight="500"
                align='center'
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                  },
                }}>
                YOUR COURSES
              </Typography>
            </Box>
            {loading ? (
              <Typography variant="body1">Loading...</Typography>
            ) : courses.length === 0 ? (
              <Typography variant="body1">You have not registered to any Course at this moment.</Typography>
            ) : (
              courses.map(course => (

                <Box
                  bgcolor="#e6f8f9"
                  p="1rem"
                  borderRadius="0.5rem"
                  mb="1rem"
                >
                  <FlexBetween pb="0.5rem">
                    <Typography
                      key={course._id}
                      fontWeight="500"
                      fontSize="1rem"
                      onClick={() => handleCourseClick(course._id)}
                      sx={{
                        "&:hover": {
                          color: "#A3A3A3",
                          cursor: 'pointer',
                        },
                      }}
                    >
                      {`${course.courseID}: ${course.courseName}`}
                    </Typography>
                    <Typography fontWeight="500" color={course.status === 'Ongoing' ? "lightgreen" : course.status === 'Completed' ? "lightcoral" : "skyblue"}>
                      {course.status}
                    </Typography>
                  </FlexBetween>
                  <FlexBetween>
                    <Typography color="#A3A3A3">{`~ ${course.facultyName}`}</Typography>
                  </FlexBetween>
                </Box>
              ))
            )}
          </Box>
        </WidgetWrapper>
      </Box>
    </Box>
  );
};