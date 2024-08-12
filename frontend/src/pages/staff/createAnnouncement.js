
import React from "react";
import { TextField, Button, Typography, Box, useTheme } from "@mui/material";
import { PersistentDrawerLeft } from "../../components/staff/navbar";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import WidgetWrapper from '../../components/WidgetWrapper';
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";

export const CreateAnnouncement = () => {
  const { palette } = useTheme();
  const main = palette.primary.main;
  const medium = palette.neutral.medium;
  const userId = useSelector((state) => state.user.staffID);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      files: [],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      values.files.forEach((file) => formData.append("file", file));
      values.files.forEach((file) => formData.append("filePath", file.name));

      try {
        const response = await fetch(
          `https://student-management-server-jozx.onrender.com/staff/${userId}/announcement/create`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to submit announcement");
        }
        formik.resetForm();
        navigate(`/staff/${userId}/announcement/all`);
      } catch (error) {
        console.error("Error creating announcement:", error);
        alert("An error occurred while creating the announcement.");
      }
    },
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
                MAKE AN ANNOUNCEMENT
              </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
              <Box display="block">
                <TextField
                  sx={{ mb: '2rem' }}
                  label="Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                  sx={{ mb: '3rem' }}
                  label="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  variant="outlined"
                  required
                  error={
                    formik.touched.description && Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
                <Box
                  border={`1px solid ${medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles={[".jpg", ".jpeg", ".png", ".pdf"]}
                    multiple={true}
                    onDrop={(acceptedFiles) => {
                      formik.setFieldValue("files", acceptedFiles);
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
                        {formik.values.files.length === 0 ? (
                          <Typography>Add Files Here...</Typography>
                        ) : (
                          <Typography>
                            {formik.values.files.map((file) => file.name).join(", ")}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <Button
                  type="submit"
                  sx={{
                    width:"100%",
                    m: "3rem 0",
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



