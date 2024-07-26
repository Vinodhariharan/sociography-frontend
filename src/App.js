import Navbar from './components/common/NavBar';
import SearchPage from './components/Naveen/SearchPage/SearchPage';
import SearchResultsPage from './components/Naveen/SearchPage/SearchResultsPage';
import PartnerList from './components/Naveen/ParnerList/PartnerList';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
// import LandingPage from './components/pages/LandingPage';
// import Login from './components/pages/Login';
// import PartnerSignUp from './components/pages/PartnerSignUp';
// import PhotographerSignUp from './components/pages/PhotographerSignUp';
import ProfilePhotographer from './components/Vinod/ProfilePhotographer.jsx';
import PartnerProfile from './components/Vinod/PartnerProfile.jsx';


function App() {
  return (
      <div>
        <Navbar />
        <Container>
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/partner-signup" element={<PartnerSignUp />} /> */}
            {/* <Route path="/photographer-signup" element={<PhotographerSignUp />} /> */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/profile-photographer" element={<ProfilePhotographer />} /> - profile-photographer
            <Route path="/" element={<PartnerProfile />} /> - partner-profile
            <Route path="/partner-listing" element={<PartnerList />} />
          </Routes>
        </Container>
      </div>
  );
}

export default App;
