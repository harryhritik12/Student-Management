import { useEffect, useState } from "react";
import { PersistentDrawerLeft } from "../../components/staff/navbar";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';


export const ComplaintByIdStaff = () => {
  const [complain, setComplain] = useState(null);
  const token = useSelector((state) => state.token);
  const { complaintID } = useParams();
  const id = useSelector((state) => state.user.staffID);
  const [loading, setLoading] = useState(true);
  const [wantOtp, setWantOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const [isButton, setIsButton] = useState(true)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/staff/${id}/eComplaint/${complaintID}/update`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        // Reload the page to reflect the changes
        setWantOtp(true);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOtp = async () => {
    try {
      const response = await fetch(`http://localhost:3001/staff/${id}/eComplaint/${complaintID}/otp`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        // Reload the page to reflect the changes
        setOtpSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(`http://localhost:3001/staff/${id}/eComplaint/${complaintID}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp: otp }), // Assuming your backend expects the OTP in this format
      });
      if (response.status === 200) {
        // Reload the page to reflect the changes
        navigate(`/staff/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const fetchComplain = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/staff/${id}/eComplaint/${complaintID}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setComplain(response.data);
        if (response.data.status === "Accepted") {
          setWantOtp(true);
        }
        else if (response.data.status === "Succesful") {
          setIsButton(false);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchComplain();
  }, []);

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };
  return (
    <Box>
      <PersistentDrawerLeft />
      <Box
        width="100%"
        padding="2rem 17%"
      >
        <WidgetWrapper>
          <Box m={2}>
            {loading && <div>Loading...</div>}
            {!loading && !complain && <div>No complaint found.</div>}
            {complain && (
              <>
                <FlexBetween mb="1rem">
                  <Box display="flex">
                    <Box>
                      <Typography color="#00D5FA"
                        fontSize="1.85rem"
                        fontWeight="500"
                      >
                        {complain?.title}
                      </Typography>
                    </Box>
                    <Box alignSelf="end">
                      <Typography color="#A3A3A3" ml="1rem" fontSize="0.8rem">{`-${complain.complainType}`}</Typography>
                    </Box>
                  </Box>
                  <Typography fontWeight="500" color={complain.status === 'Accepted' ? "lightgreen" : complain.status === 'Successful' ? "skyblue" : "lightcoral"}>
                    {complain.status}
                  </Typography>
                </FlexBetween>


                <FlexBetween
                  bgcolor="#e6f8f9"
                  p="1rem"
                  borderRadius="0.5rem"
                  mb="1rem"
                >
                  {complain?.description}
                </FlexBetween>

                <FlexBetween>
                  <Box>
                    <Box display="flex" gap="1rem" m="2rem 4rem">
                      <EmailOutlinedIcon />
                      <Typography>{complain.email}</Typography>
                    </Box>
                    <Box display="flex" gap="1rem" m="2rem 4rem">
                      <PermIdentityOutlinedIcon />
                      <Typography>{complain.rollNumber}</Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Box display="flex" gap="1rem" m="2rem 4rem 2rem">
                      <CallTwoToneIcon />
                      <Typography>{complain.contactNumber}</Typography>
                    </Box>
                    <Box display="flex" gap="1rem" m="2rem 4rem 2rem">
                      <CalendarMonthRoundedIcon />
                      <Typography>{formatDate(complain.date)}</Typography>
                    </Box>
                  </Box>

                </FlexBetween>

                {complain.picturePath && (
                  <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ mb:"2rem", borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${complain.picturePath}`}
                  />
                )}
                {isButton && otpSent && wantOtp && <Box>
                  <TextField
                    id="otp"
                    label="Enter OTP"
                    variant="outlined"
                    value={otp}
                    onChange={handleOtpChange}
                    style={{ marginTop: '1rem' }}
                  />
                  <Button sx={{width: "100%", m: "2rem 0", p: "1rem"}} variant="contained" onClick={handleVerifyOtp}>VERIFY</Button>
                </Box>}

                {isButton && !wantOtp && !otpSent && <Button sx={{width: "100%", m: "2rem 0", p: "1rem"}} variant="contained" onClick={handleUpdate}>UPDATE</Button>}
                {isButton && wantOtp && !otpSent && <Button sx={{width: "100%", m: "2rem 0", p: "1rem"}} variant="contained" onClick={handleOtp}>SEND OTP</Button>}

              </>
            )}
          </Box>
        </WidgetWrapper>
      </Box>
    </Box>
  );
}
