import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useNavigate } from 'react-router-dom';
// import {StudentIcon} from './icons/studentIcon.js'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function IconLabelTabs(props) {
  const navigate = useNavigate();


  const handleChange = (event, newValue) => {
    props.setValue(newValue);
    if(newValue === 0) navigate('/signup/student');
    else if(newValue === 1) navigate('/signup/faculty');
    else navigate('/signup/staff');
  };

  // React.useEffect(()=>{

  // })
  return (
    <Tabs value={props.value} onChange={handleChange} aria-label="icon label tabs example">
      <Tab icon={<SchoolIcon/>} label="STUDENT" />
      <Tab icon={<AccountCircleIcon />} label="FACULTY"/>
      <Tab icon={<SupervisedUserCircleIcon/>} label="STAFF" />
    </Tabs>
  );
}
