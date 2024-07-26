import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          width: '50%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px', // Half-circle effect
            backgroundColor: 'white',
            '& fieldset': {
              borderColor: 'transparent', // No border color
            },
            '&:hover fieldset': {
              borderColor: 'transparent', // No border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', // No border color on focus
            },
          },
        }}
        InputProps={{
          style: {
            paddingLeft: '15px', // Smaller padding
            paddingRight: '15px', // Smaller padding
          },
        }}
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        sx={{
          marginLeft: '10px',
          borderRadius: '25px', // Half-circle effect
          padding: '10px 20px',
          backgroundColor: '#50c878', // Customize the button color
          '&:hover': {
            backgroundColor: '#45b36b', // Darker shade for hover effect
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchPage;
