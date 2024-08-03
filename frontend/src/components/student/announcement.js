import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import axios from 'axios';
import WidgetWrapper from '../WidgetWrapper';
import FlexBetween from '../FlexBetween';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function AnnouncementBoard() {
  const [announcementData, setAnnouncementData] = useState([]);
  const userId = useSelector((state) => state.user.rollNumber);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const { palette } = useTheme();
  const main = palette.primary.main;
  const medium = palette.neutral.medium;
  const dark = palette.primary.dark;

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/student/${userId}/announcement/all`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setAnnouncementData(response.data);
      } catch (error) {
        console.error('Error fetching announcement:', error);
      }
    };

    fetchAnnouncement();
  }, [userId]);

  return (
    <WidgetWrapper>
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
          ANNOUNCEMENTS
        </Typography>
      </Box>
      {announcementData.length > 0 ? (
        announcementData.map((announcement, index) => (
          <Box
            bgcolor="#e6f8f9"
            p="1rem"
            borderRadius="0.5rem"
            mb="1rem"
          >
            <FlexBetween
              onClick={() => navigate(`/student/${userId}/announcement/${announcement._id}`)}
              sx={{
                "&:hover": {
                  cursor: 'pointer',
                },
              }}
            >
              <Typography fontWeight="500" variant="body1" m="1rem 0" fontSize="0.95rem" sx={{
                "&:hover": {
                  color: { medium },
                  cursor: 'pointer',
                },
              }}>
                {announcement.title}
              </Typography>

              <Typography color={medium} variant="body1" m="1rem 0" fontSize="0.9rem">
                {new Date(announcement.date).toLocaleDateString()}
              </Typography>
            </FlexBetween>
          </Box>
        ))
      ) : (
        <Typography color={dark} variant="body1" m="1rem 0" fontSize="0.95rem">No announcements right now.</Typography>
      )}
    </WidgetWrapper>
  );
}
