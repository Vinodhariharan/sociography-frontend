import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './components/common/NavBar';
// import LandingPage from './components/pages/LandingPage';
import Login from './components/Lokesha/Login.jsx';
import SignUpSelection from './components/Lokesha/SignUpSelection.jsx';
import PartnerSignUp from './components/Lokesha/PartnerSignUp';
import PhotographerSignUp from './components/Lokesha/PhotographerSignUp';
import ProfilePhotographer from './components/Vinod/ProfilePhotographer.jsx';
import PartnerList from './components/Naveen/ParnerList/PartnerList.jsx';
// import PartnerProfile from './components/pages/PartnerProfile';
// import SearchResults from './components/pages/SearchResults';
// import PartnerListing from './components/pages/PartnerListing';
// import PhotoUploadPage from './components/pages/PhotoUploadPage';
// import CommentsPage from './components/pages/CommentsPage';

function App() {
  return (
      <div>
        <Navbar />
        <Container>
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/signup-selection" element={<SignUpSelection />} />
            <Route path="/partner-signup" element={<PartnerSignUp />} />
            <Route path="/photographer-signup" element={<PhotographerSignUp />} />
            <Route path="/profile-photographer" element={<ProfilePhotographer />} /> - profile-photographer
            {/* <Route path="/partner-profile" element={<PartnerProfile />} /> */}
            {/* <Route path="/search-results" element={<SearchResults />} /> */}
            <Route path="/partner-listing" element={<PartnerList />} />
            {/* <Route path="/photo-upload" element={<PhotoUploadPage />} /> */}
            {/* <Route path="/comments" element={<CommentsPage />} /> */}
          </Routes>
        </Container>
      </div>
  );
}

export default App;
