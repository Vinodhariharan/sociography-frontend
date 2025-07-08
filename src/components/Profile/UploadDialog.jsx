import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, MenuItem, Select, InputLabel, FormControl, LinearProgress, Snackbar, Alert
} from '@mui/material';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Chip,
  AspectRatio,
  IconButton,
  Sheet,
  Textarea,
  Option,
  Select as JoySelect,
  FormControl as JoyFormControl,
  FormLabel,
  Input,
  LinearProgress as JoyLinearProgress
} from '@mui/joy';
import { 
  Upload, 
  Image as ImageIcon, 
  LocationOn, 
  Description, 
  Category,
  CloudUpload,
  Close,
  ArrowBack,
  Check
} from '@mui/icons-material';
import axiosInstance from '../../axiosInstance';
import { useAuth } from '../AuthContext';

const categories = [
  'Nature',
  'Landscape',
  'Astrophotography',
  'Storm',
  'Pet',
  'Macro',
  'Flower',
  'Architecture',
  'Real estate',
  'Drone',
  'Aerial',
  'Portrait',
  'Headshot',
  'Fashion',
  'Sports',
  'Documentary',
  'Street',
  'Wedding',
  'Food',
  'Product',
  'Still life',
  'Black-and-white',
  'Fine art',
  'Double exposure',
  'Surreal',
  'Abstract'
];

const UploadDialog = ({ onUploadStart, onUploadEnd }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { authState } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setFile(null);
    setLocation('');
    setDescription('');
    setCategory([]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStep(2);
  };

  const handleUpload = async () => {
    if (onUploadStart) onUploadStart();
    setLoading(true);
    
    const token = authState.token;
    const email = authState.email;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('categories', JSON.stringify(category)); // Fixed: stringify the array
    formData.append('email', email);

    try {
      await axiosInstance.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });
      setSnackbarMessage('Upload successful!');
      setSnackbarSeverity('success');
      if (onUploadEnd) onUploadEnd(true);
    } catch (error) {
      setSnackbarMessage('Upload failed!');
      setSnackbarSeverity('error');
      if (onUploadEnd) onUploadEnd(false);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
      handleClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue || []);
  };

  const removeCategory = (categoryToRemove) => {
    setCategory(prevCategory => prevCategory.filter(cat => cat !== categoryToRemove));
  };

  // Fixed: Better category toggle function
  const toggleCategory = (categoryToToggle) => {
    setCategory(prevCategory => {
      const isSelected = prevCategory.includes(categoryToToggle);
      if (isSelected) {
        return prevCategory.filter(cat => cat !== categoryToToggle);
      } else {
        return [...prevCategory, categoryToToggle];
      }
    });
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<Upload />}
        sx={{
          backgroundColor: 'white',
          color: '#1a1a1a',
          border: '1px solid #e5e5e5',
          fontFamily: 'League Spartan, sans-serif',
          textTransform: 'none',
          borderRadius: '8px',
          px: 3,
          py: 1,
          '&:hover': {
            backgroundColor: '#f9f9f9',
            borderColor: '#d4d4d4',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        }}
      >
        Upload Picture
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '16px',
            maxWidth: '700px',
            width: '100%',
            backgroundColor: '#fafafa',
            border: '1px solid #e5e5e5',
          },
        }}
      >
        <DialogTitle sx={{ 
          fontFamily: 'League Spartan, sans-serif',
          fontWeight: 600,
          textAlign: 'center',
          color: '#1a1a1a',
          pb: 1,
          position: 'relative'
        }}>
          {step === 1 ? 'Upload Picture' : 'Add Details'}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#666',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {loading && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress 
                sx={{
                  backgroundColor: '#e5e5e5',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1a1a1a',
                  },
                  borderRadius: '4px',
                  height: '4px',
                }}
              />
            </Box>
          )}

          {step === 1 ? (
            <Box sx={{ textAlign: 'center' }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-file">
                <Card
                  variant="outlined"
                  sx={{
                    p: 6,
                    cursor: 'pointer',
                    borderStyle: 'dashed',
                    borderColor: '#d4d4d4',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#1a1a1a',
                      backgroundColor: '#f9f9f9',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <CloudUpload 
                      sx={{ 
                        fontSize: 48, 
                        color: '#666',
                      }} 
                    />
                    <Typography 
                      level="title-md" 
                      sx={{ 
                        fontFamily: 'League Spartan, sans-serif',
                        fontWeight: 600,
                        color: '#1a1a1a'
                      }}
                    >
                      Choose an image to upload
                    </Typography>
                    <Typography 
                      level="body-sm" 
                      sx={{ 
                        color: '#666',
                        textAlign: 'center'
                      }}
                    >
                      Drag and drop your image here, or click to browse
                    </Typography>
                    <Button
                      variant="contained"
                      component="span"
                      sx={{
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        fontFamily: 'League Spartan, sans-serif',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 3,
                        py: 1,
                        '&:hover': {
                          backgroundColor: '#333',
                        },
                      }}
                    >
                      Select Image
                    </Button>
                  </Stack>
                </Card>
              </label>
            </Box>
          ) : (
            <Stack spacing={3}>
              {/* Image Preview */}
              {file && (
                <Card
                  variant="outlined"
                  sx={{
                    backgroundColor: 'white',
                    borderColor: '#e5e5e5',
                    overflow: 'hidden',
                  }}
                >
                  <AspectRatio ratio="16/9" sx={{ maxHeight: 300 }}>
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="Preview" 
                      style={{ 
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }} 
                    />
                  </AspectRatio>
                  <CardContent>
                    <Typography 
                      level="body-sm" 
                      sx={{ 
                        color: '#666',
                        fontFamily: 'League Spartan, sans-serif'
                      }}
                    >
                      {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </CardContent>
                </Card>
              )}

              <Divider sx={{ borderColor: '#e5e5e5' }} />

              {/* Form Fields */}
              <Stack spacing={3}>
                {/* Location */}
                <Box>
                  <FormLabel 
                    sx={{ 
                      fontFamily: 'League Spartan, sans-serif',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <LocationOn sx={{ fontSize: 18 }} />
                    Location
                  </FormLabel>
                  <TextField
                    fullWidth
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where was this photo taken?"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        fontFamily: 'League Spartan, sans-serif',
                        '& fieldset': {
                          borderColor: '#e5e5e5',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d4d4d4',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1a1a1a',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Description */}
                <Box>
                  <FormLabel 
                    sx={{ 
                      fontFamily: 'League Spartan, sans-serif',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Description sx={{ fontSize: 18 }} />
                    Description
                  </FormLabel>
                  <TextField
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about this photo..."
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        fontFamily: 'League Spartan, sans-serif',
                        '& fieldset': {
                          borderColor: '#e5e5e5',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d4d4d4',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1a1a1a',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Categories */}
                <Box>
                  <FormLabel 
                    sx={{ 
                      fontFamily: 'League Spartan, sans-serif',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Category sx={{ fontSize: 18 }} />
                    Categories
                  </FormLabel>
                  
                  {/* Selected Categories */}
                  {category.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography 
                        level="body-sm" 
                        sx={{ 
                          color: '#666',
                          mb: 1,
                          fontFamily: 'League Spartan, sans-serif',
                          fontWeight: 500
                        }}
                      >
                        Selected ({category.length}):
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {category.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            size="small"
                            onDelete={() => removeCategory(value)}
                            sx={{
                              backgroundColor: '#1a1a1a',
                              color: 'white',
                              border: '1px solid #1a1a1a',
                              fontFamily: 'League Spartan, sans-serif',
                              '& .MuiChip-deleteIcon': {
                                color: 'white',
                                '&:hover': {
                                  color: '#ccc',
                                },
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Category Selection Grid */}
                  <Card
                    variant="outlined"
                    sx={{
                      backgroundColor: 'white',
                      borderColor: '#e5e5e5',
                      borderRadius: '8px',
                      p: 2,
                      maxHeight: '200px',
                      overflow: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f5f5f5',
                        borderRadius: '3px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#d4d4d4',
                        borderRadius: '3px',
                        '&:hover': {
                          backgroundColor: '#ccc',
                        },
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {categories.map((cat, index) => {
                        const isSelected = category.includes(cat);
                        return (
                          <Chip
                            key={`${cat}-${index}`} // Fixed: Better key
                            label={cat}
                            clickable
                            size="small"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleCategory(cat);
                            }}
                            sx={{
                              backgroundColor: isSelected ? '#1a1a1a' : '#f9f9f9',
                              color: isSelected ? 'white' : '#333',
                              border: '1px solid',
                              borderColor: isSelected ? '#1a1a1a' : '#e5e5e5',
                              fontFamily: 'League Spartan, sans-serif',
                              fontWeight: isSelected ? 600 : 400,
                              transition: 'all 0.2s ease',
                              cursor: 'pointer',
                              userSelect: 'none',
                              '&:hover': {
                                backgroundColor: isSelected ? '#333' : '#f5f5f5',
                                borderColor: isSelected ? '#333' : '#d4d4d4',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              },
                              '&:active': {
                                transform: 'translateY(0)',
                              },
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Card>
                </Box>
              </Stack>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ width: '100%', justifyContent: 'center' }}
          >
            {step === 2 && (
              <Button
                onClick={() => setStep(1)}
                startIcon={<ArrowBack />}
                sx={{
                  color: '#666',
                  fontFamily: 'League Spartan, sans-serif',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleClose}
              sx={{
                color: '#666',
                fontFamily: 'League Spartan, sans-serif',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              Cancel
            </Button>
            {step === 2 && (
              <Button
                onClick={handleUpload}
                variant="contained"
                startIcon={<Check />}
                disabled={loading}
                sx={{
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  fontFamily: 'League Spartan, sans-serif',
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 3,
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                  '&:disabled': {
                    backgroundColor: '#ccc',
                  },
                }}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </Button>
            )}
          </Stack>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          sx={{
            fontFamily: 'League Spartan, sans-serif',
            '& .MuiAlert-message': {
              fontWeight: 500,
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadDialog;