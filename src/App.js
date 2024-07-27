import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/common/NavBar';
import SearchPage from './components/Naveen/SearchPage/SearchPage';
import SearchResultsPage from './components/Naveen/SearchPage/SearchResultsPage';
import PartnerList from './components/Naveen/ParnerList/PartnerList';
import Login from './components/Lokesha/Login.jsx';
import SignUpSelection from './components/Lokesha/SignUpSelection.jsx';
import PartnerSignUp from './components/Lokesha/PartnerSignUp';
import PhotographerSignUp from './components/Lokesha/PhotographerSignUp';
import ProfilePhotographer from './components/Vinod/ProfilePhotographer.jsx';
import PartnerProfile from './components/Vinod/PartnerProfile.jsx';
import Footer from './components/common/Footer.jsx';
import SocialMediaFeed from './components/common/LandingPage.jsx';

function App() {
  const location = useLocation();
  const isAuthPage = ['/','/signup-selection', '/photographer-signup', '/partner-signup'].includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAuthPage && <Navbar />}
      <Container sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup-selection" element={<SignUpSelection />} />
          <Route path="/photographer-signup" element={<PhotographerSignUp />} />
          <Route path="/partner-signup" element={<PartnerSignUp />} />
          <Route path="/home" element={<SocialMediaFeed />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/partner-listing" element={<PartnerList />} />
          <Route path="/partner-profile" element={<PartnerProfile />} />
          <Route path="/profile-photographer" element={<ProfilePhotographer />} /> 
        </Routes>
      </Container>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
