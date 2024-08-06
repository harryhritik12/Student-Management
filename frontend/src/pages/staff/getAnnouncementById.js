import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { PersistentDrawerLeft } from '../../components/staff/navbar';
import WidgetWrapper from '../../components/WidgetWrapper.js';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import FlexBetween from '../../components/FlexBetween';
import DeleteIcon from '@mui/icons-material/Delete';

export const AnnouncementByIdStaff = () => {
    const { announcementId } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.staffID);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/staff/${userId}/announcement/${announcementId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setAnnouncement(response.data);
            } catch (error) {
                console.error('Error fetching announcement:', error);
            }
        };

        fetchAnnouncement();
    }, [userId, announcementId, token]);


    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/staff/${userId}/announcement/delete/${announcementId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate(`/staff/${userId}/announcement/all`);
            } else {
                console.error('Failed to delete announcement. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };



    if (!announcement) {
        return <p>Loading...</p>;
    }

    const { title, description, date, filePath } = announcement;

    return (
        <Box>
            <PersistentDrawerLeft />
            <Box width="100%" padding="2rem 17%">
                <WidgetWrapper>
                    <Box mb="1rem" display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap="1rem">
                            <Typography color="#00D5FA" fontSize="1.85rem" fontWeight="500">{title}</Typography>
                            <CampaignRoundedIcon fontSize='large' />
                        </Box>
                        <Typography color="#A3A3A3" variant="body1" fontSize="0.9rem">{new Date(date).toLocaleDateString()}</Typography>
                    </Box>
                    <FlexBetween bgcolor="#e6f8f9" p="1rem" borderRadius="0.5rem" mb="1rem">
                        <Typography fontSize="1rem">{description}</Typography>
                    </FlexBetween>
                    <Grid container spacing={2}>
                        {filePath && filePath.map((file, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <iframe title={`File ${index + 1}`} style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none', 
                                    marginBottom: '0.75rem'
                                }} src={`https://chaurasiyabuckets.s3.ap-south-1.amazonaws.com/public/assets/${file}`} />
                            </Grid>
                        ))}
                    </Grid>
                    <Box textAlign="right" mt="1rem">
                        <Button onClick={handleDelete} variant="contained" color="error">
                            <DeleteIcon />
                        </Button>
                    </Box>
                </WidgetWrapper>
            </Box>
        </Box>
    );
}
