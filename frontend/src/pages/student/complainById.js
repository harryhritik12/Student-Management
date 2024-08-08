import { useEffect, useState } from "react";
import { PersistentDrawerLeft } from "../../components/student/navbar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

export const ComplaintById = () => {
  const [complain, setComplain] = useState(null);
  const token = useSelector((state) => state.token);
  const { id, complaintID } = useParams();
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchComplain = async () => {
      try {
        const response = await axios.get(`${process.env.NODE_BACKEND_APP_BASE_URL}/student/${id}/eComplaint/${complaintID}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setComplain(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchComplain();
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
                      <Typography>{complain?.email}</Typography>
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
                    src={`https://chaurasiyabuckets.s3.ap-south-1.amazonaws.com/public/assets/${complain.picturePath}`}
                  />
                )}
              </>
            )}
          </Box>
        </WidgetWrapper>
      </Box>
    </Box>
  );
};
