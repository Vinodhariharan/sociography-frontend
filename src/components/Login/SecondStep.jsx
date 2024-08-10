import React from 'react';
import { Grid, Button, Typography, Box, IconButton, Paper } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import InnerInput from './InnerInput';

const StyledPaper = styled(Paper)({
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0px 6px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 12px 24px rgba(0,0,0,0.2)',
  },
});

// const StyledInput = styled('input')({
//     border: 'none',
//     minWidth: 0,
//     outline: 0,
//     padding: 0,
//     paddingTop: '1em',
//     flex: 1,
//     color: 'inherit',
//     backgroundColor: 'transparent',
//     fontFamily: 'inherit',
//     fontSize: 'inherit',
//     fontStyle: 'inherit',
//     fontWeight: 'inherit',
//     lineHeight: 'inherit',
//     textOverflow: 'ellipsis',
//     '&::placeholder': {
//       opacity: 0,
//       transition: '0.1s ease-out',
//     },
//     '&:focus::placeholder': {
//       opacity: 1,
//     },
//     '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
//       top: '0.5rem',
//       fontSize: '0.75rem',
//     },
//     '&:focus ~ label': {
//       color: 'var(--Input-focusedHighlight)',
//     },
//     '&:-webkit-autofill': {
//       alignSelf: 'stretch',
//     },
//     '&:-webkit-autofill:not(* + &)': {
//       marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
//       paddingInlineStart: 'var(--Input-paddingInline)',
//       borderTopLeftRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
//       borderBottomLeftRadius: 'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
//     },
//   });
  
  const StyledLabel = styled('label')(({ theme }) => ({
    position: 'absolute',
    lineHeight: 1,
    top: 'calc((var(--Input-minHeight) - 1em) / 2)',
    color: theme.vars.palette.text.tertiary,
    fontWeight: theme.vars.fontWeight.md,
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  }));
  
//   const InnerInput = React.forwardRef(function InnerInput(props, ref) {
//     const id = React.useId();
//     return (
//       <React.Fragment>
//         <StyledInput {...props} ref={ref} id={id} />
//         <StyledLabel htmlFor={id}>{props.label}</StyledLabel>
//       </React.Fragment>
//     );
//   });

const FloatingLabelInput = ({ label, placeholder, type, value, onChange, endDecorator }) => (
    <Input
      endDecorator={endDecorator}
      slots={{ input: InnerInput }}
      slotProps={{ input: { placeholder, type, value, onChange, label } }}
      sx={{
        '--Input-minHeight': '56px',
        '--Input-radius': '6px',
        marginBottom: '16px',
      }}
    />
  );
  

const StyledButton = styled(Button)({
  fontFamily: 'League Spartan, sans-serif',
  marginTop: '20px',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

// const FloatingLabelInput = ({ label, placeholder, type, value, onChange, endDecorator }) => (
//   <Input
//     endDecorator={endDecorator}
//     slots={{ input: InnerInput }}
//     slotProps={{ input: { placeholder, type, value, onChange, label } }}
//     sx={{
//       '--Input-minHeight': '56px',
//       '--Input-radius': '6px',
//       marginBottom: '16px',
//     }}
//   />
// );

const SecondStep = ({ dob, profilePic, selfInfo, location, contactNo, email, handleProfilePicChange, handleSignup, handleBack, setEmail, setDob, setLocation, setSelfInfo }) => {
  return (
    <StyledPaper>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'League Spartan, sans-serif', fontWeight: 'bold' }}>
        Photographer Sign Up
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-pic"
              type="file"
              onChange={handleProfilePicChange}
            />
            <label htmlFor="profile-pic">
              <StyledButton
                variant="contained"
                component="span"
                startIcon={<PhotoCameraIcon />}
              >
                Upload Profile Picture
              </StyledButton>
            </label>
            {profilePic && (
              <Box mt={2} textAlign="center">
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <FloatingLabelInput
              label="Email or Phone"
              placeholder="Enter your email or phone"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FloatingLabelInput
              label="Date of Birth"
              placeholder="Enter your date of birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FloatingLabelInput
              label="Location"
              placeholder="Enter your location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FloatingLabelInput
              label="Self Intro"
              placeholder="Tell us about yourself"
              type="text"
              value={selfInfo}
              onChange={(e) => setSelfInfo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSignup}
            >
              Sign Up
            </StyledButton>
            <StyledButton
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleBack}
              sx={{ mt: 2 }}
            >
              Back
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default SecondStep;
