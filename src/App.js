import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Nav/NavBar';
import Footer from './components/Nav/Footer';
import Login from './components/Login/Login';
import SignUpSelection from './components/Login/SignUpSelection';
import PartnerSignUp from './components/Login/PartnerSignUp';
import PhotographerSignUp from './components/Login/PhotographerSignUp';
// import SocialMediaFeed from './components/common/LandingPage';
import SearchPage from './components/SearchComponents/SearchPage';
import SearchResultsPage from './components/SearchComponents/SearchResultsPage';
import ProfilePhotographer from './components/Profile/ProfilePhotographer';
import PartnerList from './components/PartnerListing/PartnerList';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import UserPage from './components/Profile/UserPage';
import { ThemeProvider } from './ThemeContext';
import PartnerPage from './components/PartnerListing/PartnerPage';
import NotFound from './components/common/NotFound';
import SocialMediaFeed from './components/LandingPage/LandingPage';
import PhotographerPage from './components/common/PhotographerPage';

const PageWrapper = ({ children }) => {
  return (
    <Container style={{ marginTop: '70px' }}>
      {children}
    </Container>
  );
};

function App() {
  const location = useLocation();
  const hideNavAndFooter = ["/login", "/signup-selection", "/photographer-signup", "/partner-signup"].includes(location.pathname);
  
  const isProfilePage = location.pathname.includes("/partner-profile") || location.pathname.includes("/profile-photographer");

  const gradientBackground = {
    background: '#e2e5e9',
    backgroundSize: 'auto',
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const containerStyle = {
    flex: 1,
    boxShadow: isProfilePage ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
    backgroundColor: isProfilePage ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
    padding: '20px',
    marginTop: 4,
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div style={gradientBackground}>
          {!hideNavAndFooter && <Navbar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup-selection" element={<SignUpSelection />} />
            <Route path="/photographer-signup" element={<PhotographerSignUp />} />
            <Route path="/partner-signup" element={<PartnerSignUp />} />
            <Route path="/" element={<PageWrapper><SocialMediaFeed /></PageWrapper>} />
            {/* <Route path="/search" element={<PageWrapper><SearchPage /></PageWrapper>} /> */}
            <Route path="/search-results" element={<PageWrapper><SearchResultsPage /></PageWrapper>} />
            <Route
              path="/partner-profile/:partnerId"
              element={
                <PrivateRoute>
                  <PageWrapper><PartnerPage /></PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile-photographer/:photographerId"
              element={
                <PrivateRoute>
                  <PageWrapper><PhotographerPage /></PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/partner-listing"
              element={
                <PrivateRoute>
                <PageWrapper><PartnerList /></PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                <PageWrapper><UserPage /></PageWrapper>
                </PrivateRoute>
              }
            />
          <Route
              path="/*"
              element={
                <NotFound/>
              }
            />
          </Routes>
          {!hideNavAndFooter && <Footer />}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
