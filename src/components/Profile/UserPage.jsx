// src/components/UserPage.js
import React from 'react';
import { useAuth } from '../AuthContext';
import PartnerProfile from './PartnerProfile';
import ProfilePhotographer from './ProfilePhotographer';
import NotFound from '../common/NotFound';

const UserPage = () => {
  const { authState } = useAuth();

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
