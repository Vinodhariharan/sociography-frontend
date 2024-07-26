import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, MenuItem, Select, InputLabel, FormControl, Divider, Box, LinearProgress, Snackbar, Alert, Typography
} from '@mui/material';

const categories = [
  'Nature',
  'Architecture',
  'Portrait',
  'Fashion',
  'Events',
  'Food'
];

const UploadDialog = ({ onUploadStart, onUploadEnd }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setFile(null);
    setLocation('');
    setDescription('');
    setCategory('');
  };

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setStep(2); // Move to the next step after file is selected
  };

  const handleUpload = () => {
    if (onUploadStart) onUploadStart();
    setLoading(true);
    // Simulate file upload
    setTimeout(() => {
      setLoading(false);
      // Simulate upload success or failure
      const success = Math.random() > 0.5;
      setSnackbarMessage(success ? 'Upload successful!' : 'Upload failed!');
      setSnackbarSeverity(success ? 'success' : 'error');
      setSnackbarOpen(true);
      if (onUploadEnd) onUploadEnd(success);
      handleClose();
    }, 2000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Upload Picture
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '10px',
            maxWidth: '800px',
            width: '100%',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {step === 1 ? 'Upload Picture' : 'Add Details'}
        </DialogTitle>
        <DialogContent>
          {loading && <LinearProgress />}
          {step === 1 ? (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6} textAlign="center">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="upload-file">
                  <Button variant="contained" component="span">
                    Select Image
                  </Button>
                </label>
              </Grid>
            </Grid>
          ) : (
            <>
              {file && (
                <Box display="flex" justifyContent="center" my={2}>
                  <img src={file} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </Box>
              )}
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} textAlign="center">
                  <TextField
                    fullWidth
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((category, index) => (
                        <MenuItem key={index} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="center">
            {step === 2 && (
              <Button onClick={() => setStep(1)} color="primary">
                Back
              </Button>
            )}
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {step === 2 && (
              <Button onClick={handleUpload} color="primary">
                Upload
              </Button>
            )}
          </Grid>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UploadDialog;
