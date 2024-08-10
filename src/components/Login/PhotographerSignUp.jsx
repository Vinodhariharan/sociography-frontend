import React, { useState } from 'react';
import { Grid, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import FirstStep from './FirstStep'; // Adjust the path as necessary
import SecondStep from './SecondStep'; // Adjust the path as necessary
import axiosInstance from '../../axiosInstance'; // Import the Axios instance
import {useAuth} from '../AuthContext';

const PhotographerSignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [selfInfo, setSelfInfo] = useState('');
  const [location, setLocation] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const {signup} = useAuth(); 

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]); // Use the file object instead of URL
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };


const handleSignup = async () => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('dob', dob);
        formData.append('selfInfo', selfInfo);
        formData.append('location', location);
        formData.append('contactNo', contactNo);
        formData.append('email', email);
        if (profilePic) {
            formData.append('profilePic', profilePic);
        }

        const response = await axiosInstance.post('/api/signup/photographer', formData);
        console.log(response.data);
        // Assuming the token is included in the response data
        const token = response.data.split('Token: ')[1];
        console.log(response.data.split('Token: ')[1]);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('mode', 'photographer');
        localStorage.setItem('photographerId', response.data.photographerId);
        await signup(); // Adjust according to response structure

        // Redirect or handle successful signup
        navigate('/');
    } catch (error) {
        console.error('Signup error:', error);
    }
};


  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', padding: '20px' }}
    >
      <Slide direction="up" in mountOnEnter unmountOnExit>
        <Grid item xs={12} sm={10} md={6}>
          {step === 1 && (
            <FirstStep
              name={name}
              username={username}
              password={password}
              showPassword={showPassword}
              setName={setName}
              setUsername={setUsername}
              setPassword={setPassword}
              setShowPassword={setShowPassword}
              handleNext={handleNext}
            />
          )}
          {step === 2 && (
            <SecondStep
              dob={dob}
              profilePic={profilePic}
              selfInfo={selfInfo}
              location={location}
              contactNo={contactNo}
              email={email}
              setEmail={setEmail}
              setDob={setDob}
              setLocation={setLocation}
              setSelfInfo={setSelfInfo}
              handleProfilePicChange={handleProfilePicChange}
              handleSignup={handleSignup}
              handleBack={handleBack}
            />
          )}
        </Grid>
      </Slide>
    </Grid>
  );
};

export default PhotographerSignUp;
