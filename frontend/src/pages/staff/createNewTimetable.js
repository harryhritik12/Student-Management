import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Box, Grid, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PersistentDrawerLeft } from '../../components/staff/navbar';
import WidgetWrapper from '../../components/WidgetWrapper';

export const CreateNewTimetable = () => {

    const { palette } = useTheme();
    const main = palette.primary.main;
    const medium = palette.neutral.medium;
    const dark = palette.primary.dark;
    const userId = useSelector((state) => state.user.staffID);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        program: '',
        branch: '',
        batch: '',
        semester: '',
        timetable: {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: []
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTimetableChange = (e, day, index) => {
        const { name, value } = e.target;
        const updatedTimetable = { ...formData.timetable };
        updatedTimetable[day][index][name] = value;
        setFormData(prevState => ({
            ...prevState,
            timetable: updatedTimetable
        }));
    };

    const handleAddSubject = (day) => {
        const updatedTimetable = { ...formData.timetable };
        updatedTimetable[day].push({
            subject: '',
            time: '',
            room: ''
        });
        setFormData(prevState => ({
            ...prevState,
            timetable: updatedTimetable
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_BACKEND_URL}/staff/${userId}/timetable/create`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create timetable');
            }

            // Redirect to a new page or perform any other action upon successful creation
            console.log('Timetable created successfully');
            navigate(`/staff/${userId}/timetable/all`)
        } catch (error) {
            console.error('Error creating timetable:', error.message);
            alert(error.message);
        }
    };

    return (
        <Box>
            <PersistentDrawerLeft />
            <Box
                width="100%"
                padding="2rem 17%"
            >
                <WidgetWrapper>
                    <Box p={4}>
                        <Box marginBottom="2rem">
                            <Typography color={main}
                                variant="h3"
                                fontWeight="500"
                                align='center'
                            >
                                CREATE A TIMETABLE
                            </Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="program-label">Program</InputLabel>
                                        <Select
                                            labelId="program-label"
                                            id="program"
                                            name="program"
                                            value={formData.program}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="BTech">BTech</MenuItem>
                                            <MenuItem value="MTech">MTech</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="branch-label">Branch</InputLabel>
                                        <Select
                                            labelId="branch-label"
                                            id="branch"
                                            name="branch"
                                            value={formData.branch}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="CSE">CSE</MenuItem>
                                            <MenuItem value="ECE">ECE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid m="1rem 0 2rem" item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="batch"
                                        name="batch"
                                        label="Batch"
                                        value={formData.batch}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid m="1rem 0 2rem" item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="semester"
                                        name="semester"
                                        label="Semester"
                                        value={formData.semester}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                {Object.entries(formData.timetable).map(([day, subjects]) => (
                                    <Grid key={day} item xs={12}>
                                        <Typography color={medium} variant="h6">{day}</Typography>
                                        {subjects.map((subject, index) => (
                                            <Grid key={index} container spacing={3}>
                                                <Grid mb="1rem" item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        name="subject"
                                                        label="Subject"
                                                        value={subject.subject}
                                                        onChange={(e) => handleTimetableChange(e, day, index)}
                                                    />
                                                </Grid>
                                                <Grid mb="1rem" item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        name="time"
                                                        label="Time"
                                                        value={subject.time}
                                                        onChange={(e) => handleTimetableChange(e, day, index)}
                                                    />
                                                </Grid>
                                                <Grid mb="1rem" item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        name="room"
                                                        label="Room"
                                                        value={subject.room}
                                                        onChange={(e) => handleTimetableChange(e, day, index)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        ))}
                                        <Button variant="outlined" onClick={() => handleAddSubject(day)}>Add Subject</Button>
                                    </Grid>
                                ))}
                            </Grid>
                            <Button
                                type="submit"
                                sx={{
                                    width: "100%",
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main },
                                }}>Submit</Button>
                        </form>

                    </Box>
                </WidgetWrapper>
            </Box>
        </Box>
    );
};

