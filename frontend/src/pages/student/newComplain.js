import React from 'react';
import { PersistentDrawerLeft } from '../../components/student/navbar';
import { Box, TextField, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import WidgetWrapper from '../../components/WidgetWrapper';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const NewComplainPage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();
    const main = palette.primary.main;
    const medium = palette.neutral.medium;
    const userId = useSelector((state) => state.user.rollNumber);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        contactNumber: '',
        rollNumber: '',
        complainType: '',
        title: '',
        description: '',
        picture: null
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email format'),
        contactNumber: Yup.string().required('Contact number is required'),
        rollNumber: Yup.number().required('Roll number is required'),
        complainType: Yup.string().required('Complaint type is required'),
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    });

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append("email", values.email);
            formData.append("contactNumber", values.contactNumber);
            formData.append("rollNumber", values.rollNumber);
            formData.append("complainType", values.complainType);
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("picture", values.picture);
            formData.append("picturePath", values.picturePath);

    
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/student/${userId}/eComplaint/submit`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData, // Pass formData instead of JSON.stringify(values)
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit complaint');
            }
    
            console.log('Complaint submitted successfully');
            navigate(`/student/${userId}/eComplaint/all`);

        } catch (error) {
            console.error('Error submitting complaint:', error.message);
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
                    <Box p={4}>
                        <Box marginBottom="2rem">
                            <Typography color={main}
                                variant="h3"
                                fontWeight="500"
                                align='center'
                            >
                                REGISTER YOUR COMPLAINT HERE!
                            </Typography>
                        </Box>
                        <form onSubmit={formik.handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    id="contactNumber"
                                    name="contactNumber"
                                    label="Contact Number"
                                    value={formik.values.contactNumber}
                                    onChange={formik.handleChange}
                                    error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                                    helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    id="rollNumber"
                                    name="rollNumber"
                                    label="Roll Number"
                                    value={formik.values.rollNumber}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rollNumber && Boolean(formik.errors.rollNumber)}
                                    helperText={formik.touched.rollNumber && formik.errors.rollNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    id="complainType"
                                    name="complainType"
                                    label="Complaint Type"
                                    value={formik.values.complainType}
                                    onChange={formik.handleChange}
                                    error={formik.touched.complainType && Boolean(formik.errors.complainType)}
                                    helperText={formik.touched.complainType && formik.errors.complainType}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                    sx={{ gridColumn: "span 2" }}
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
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                            formik.setFieldValue("picture", acceptedFiles[0]);
                                            formik.setFieldValue("picturePath", acceptedFiles[0].name);
                                        }}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed #1976d2`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!formik.values.picture ? (
                                                    <Typography>Add Picture Here...</Typography>
                                                ) : (
                                                    <Typography>{formik.values.picture.name}</Typography>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>

                                <Button
                                    type="submit"
                                    sx={{
                                        gridColumn: "span 4",
                                        m: "2rem 0",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main },
                                    }}>Submit</Button>
                            </Box>

                        </form>
                    </Box>
                </WidgetWrapper>
            </Box>
        </Box>
    );
};

