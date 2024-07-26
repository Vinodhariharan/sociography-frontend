import React from 'react';
import { useLocation } from 'react-router-dom';
import DribbbleShot from "../../Vinod/DribbbleShot"

const sampleData = [
  {
    id: 1,
    image: 'https://via.placeholder.com/400x300',
    title: 'Sample Image 1',
    location: 'New York, NY',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/400x300',
    title: 'Sample Image 2',
    location: 'Los Angeles, CA',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/400x300',
    title: 'Sample Image 3',
    location: 'Chicago, IL',
  },
  // Add more sample data as needed
];

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  // Filter sampleData based on query (case-insensitive)
  const filteredData = sampleData.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Results for "{query}"</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <DribbbleShot
              key={item.id}
              image={item.image}
              title={item.title}
              location={item.location}
            />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
