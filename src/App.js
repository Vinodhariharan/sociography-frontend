import Navbar from './components/common/NavBar';
import SearchPage from './components/Naveen/SearchPage/SearchPage';
import SearchResultsPage from './components/Naveen/SearchPage/SearchResultsPage';
import PartnerList from './components/Naveen/ParnerList/PartnerList';
// import LandingPage from './components/pages/LandingPage';
// import Login from './components/pages/Login';
// import PartnerSignUp from './components/pages/PartnerSignUp';
// import PhotographerSignUp from './components/pages/PhotographerSignUp';
// import ProfilePhotographer from './components/Vinod/ProfilePhotographer.jsx';
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
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/partner-signup" element={<PartnerSignUp />} /> */}
            {/* <Route path="/photographer-signup" element={<PhotographerSignUp />} /> */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            {/* <Route path="/partner-profile" element={<PartnerProfile />} /> */}
            {/* <Route path="/partner-listing" element={<PartnerList />} /> */}
            <Route path="/" element={<ProfilePhotographer />} /> - profile-photographer
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
