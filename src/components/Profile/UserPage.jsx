// src/components/UserPage.js
import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import PartnerProfile from './PartnerProfile';
import ProfilePhotographer from './ProfilePhotographer';
import { useNavigate } from 'react-router-dom';
import NotFound from '../common/NotFound';

const UserPage = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (authState.mode === 'guest') {
  //   }
  // }, [authState, navigate]);
  
  // if (!authState) {
  //   // Display a loading indicator or some fallback content while authState is being fetched
  //   return <div>Loading...</div>;
  // }
  
  if (authState.mode === 'photographer') {
    return <ProfilePhotographer />;
  } else if (authState.mode === 'partner') {
    return <PartnerProfile />;
  }
  return <NotFound/>

};

export default UserPage;
