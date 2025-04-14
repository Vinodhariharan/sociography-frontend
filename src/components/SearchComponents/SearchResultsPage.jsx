import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DribbbleShot from '../common/Post/DribbbleShot';
import axios from 'axios';
import { CircularProgress, LinearProgress } from '@mui/joy';
import { useAuth } from '../AuthContext';

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authState} = useAuth();


  const convertToBase64 = (data) => `data:image/png;base64,${data}`;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://3.106.239.84:8080/pictures/search', {
          params: { keyword: query }
        });
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch search results. Please try again.');
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Results for "{query}"</h1>
      {loading && <LinearProgress />}
      {error && <p>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
        {results.length > 0 ? (
          results.map(item => (
            <div key={item.id} style={{ flex: '1 0 21%', boxSizing: 'border-box' }}>
             <DribbbleShot
  id={item.id}
  image={item.picture} // Removing convertToBase64 here because DribbbleShot does it
  description={item.description}
  location={item.location}
  date={item.timestamp}
  likes={item.likes}
  author={item.photographer?.name}
  avatar={item.photographer?.profilePic} // Removing convertToBase64 here because DribbbleShot does it
  category={item.categories ? item.categories.map(cat => cat.name).join(', ') : ''}
  initialComments={item.comments}
  photographerId={authState.photographerId} // from the auth context
  picAuthId={item.photographer?.id} // this should be item.photographer.id, if available
/>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
