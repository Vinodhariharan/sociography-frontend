import Navbar from './components/common/NavBar';
import SearchPage from './components/Naveen/SearchPage/SearchPage';
import SearchResultsPage from './components/Naveen/SearchPage/SearchResultsPage';
import PartnerList from './components/Naveen/ParnerList/PartnerList';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Lokesha/Login.jsx';
import SignUpSelection from './components/Lokesha/SignUpSelection.jsx';
import PartnerSignUp from './components/Lokesha/PartnerSignUp';
import PhotographerSignUp from './components/Lokesha/PhotographerSignUp';
import ProfilePhotographer from './components/Vinod/ProfilePhotographer.jsx';
import PartnerProfile from './components/Vinod/PartnerProfile.jsx';
import Footer from './components/common/Footer.jsx';
import SocialMediaFeed from './components/common/LandingPage.jsx';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container sx={{ flex: 1 }}>
        <Routes>
          <Route path="/home" element={<SocialMediaFeed />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/partner-signup" element={<PartnerSignUp />} />
          <Route path="/photographer-signup" element={<PhotographerSignUp />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/profile-photographer" element={<ProfilePhotographer />} /> 
          <Route path="/partner-profile" element={<PartnerProfile />} />
          <Route path="/partner-listing" element={<PartnerList />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup-selection" element={<SignUpSelection />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
