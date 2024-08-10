import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProfileAvatar from '../common/ProfileAvatar';
import { Link } from 'react-router-dom';

const PartnerCard = ({ title, description, imageUrl,id }) => {
  if (!title || !description || !imageUrl) {
    return <div>Error: Missing props!</div>;
  }

  return (
    <Card sx={{ 
      boxShadow: 3, 
      borderRadius: 2, 
      width: '100%', 
      height: 200, 
      padding: 2, 
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 auto', 
      '&:hover': { 
        boxShadow: 6, 
        transform: 'translateY(-2px)' 
      } 
    }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <ProfileAvatar imageUrl={imageUrl} altText={title} height="100px" width="100px" />
        </Grid>
        <Grid item xs>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'League Spartan, sans-serif' }}>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'League Spartan, sans-serif', fontSize: '1.1rem' }}>
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" sx={{ fontFamily: 'League Spartan, sans-serif' }}>Connect</Button>
            <Button
      size="small"
      sx={{ fontFamily: 'League Spartan, sans-serif' }}
      component={Link}
      to={`/partner-profile/${id}`}
    >
      Learn More
    </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

PartnerCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default PartnerCard;
