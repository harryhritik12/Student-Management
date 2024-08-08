import React, { useState, useEffect } from 'react';
import { PersistentDrawerLeft } from '../../components/student/navbar.js';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WidgetWrapper from '../../components/WidgetWrapper.js';
import FlexBetween from '../../components/FlexBetween.js';

export const RegisteredComplainPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const main = palette.primary.main;
  const medium = palette.neutral.medium;
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user.rollNumber);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleCourseClick = (complaintId) => {
    navigate(`/student/${userId}/eComplaint/${complaintId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`${process.env.NODE_BACKEND_APP_BASE_URL}/student/${userId}/eComplaint/all`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }

        const data = await response.json();
        setComplaints(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setLoading(false);
      }
    };

    fetchComplaints();
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
              mb="2rem"
              fontWeight="500"
              align='center'
              >
              YOUR COMPLAINTS
            </Typography>
            </Box>
            {loading ? (
              <Typography variant="body1">Loading...</Typography>
            ) : complaints.length === 0 ? (
              <Typography variant="body1">You have not registered complaints at this moment.</Typography>
            ) : (
              complaints.map(complaint => (
                <Box
                  bgcolor="#e6f8f9"
                  p="1rem"
                  borderRadius="0.5rem"
                  mb="1rem"
                >
                <Typography
                  key={complaint._id}
                  variant="body1"
                  onClick={() => handleCourseClick(complaint._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <FlexBetween
                    bgcolor="#e6f8f9"
                    p="1rem"
                    borderRadius="0.5rem"
                  >
                    <Typography variant="body1"
                      fontWeight="500"
                      fontSize="1rem"
                      sx={{
                        "&:hover": {
                          color: "#A3A3A3",
                        },
                      }}
                    >
                      {`${complaint.title}`}
                    </Typography>
                    <Typography variant="body1"
                      color="#A3A3A3"
                      
                    >
                      {`${formatDate(complaint.date)}`}
                    </Typography>
                  </FlexBetween>
                </Typography>
              </Box>
              ))
            )}
          </Box>
        </WidgetWrapper>
      </Box>
    </Box>
  );
};