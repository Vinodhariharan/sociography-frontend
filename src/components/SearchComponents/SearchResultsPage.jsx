// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import DribbbleShot from "../common/Post/DribbbleShot";

// const sampleData = [
//   {
//     id: 1,
//     image: '/image1.jpg',
//     description: 'Sample Image 1',
//     location: 'New York, NY',
//     date: '2024-07-25',
//     likes: 120,
//     author: 'John Doe',
//     avatar: 'https://via.placeholder.com/50',
//     category: 'Landscape',
//     initialComments: [
//       { user: 'Alice', text: 'Beautiful!', avatar: 'https://via.placeholder.com/50' },
//       { user: 'Bob', text: 'Amazing shot!', avatar: 'https://via.placeholder.com/50' },
//     ],
//   },
//   {
//     id: 2,
//     image: '/image2.jpg',
//     description: 'Sample Image 2',
//     location: 'Los Angeles, CA',
//     date: '2024-07-24',
//     likes: 85,
//     author: 'Jane Smith',
//     avatar: 'https://via.placeholder.com/50',
//     category: 'Portrait',
//     initialComments: [
//       { user: 'Charlie', text: 'Incredible!', avatar: 'https://via.placeholder.com/50' },
//       { user: 'David', text: 'Love it!', avatar: 'https://via.placeholder.com/50' },
//     ],
//   },
//   {
//     id: 3,
//     image: '/image3.jpg',
//     description: 'Sample Image 3',
//     location: 'Chicago, IL',
//     date: '2024-07-23',
//     likes: 60,
//     author: 'Michael Johnson',
//     avatar: 'https://via.placeholder.com/50',
//     category: 'Urban',
//     initialComments: [
//       { user: 'Eve', text: 'Fantastic!', avatar: 'https://via.placeholder.com/50' },
//       { user: 'Frank', text: 'Great work!', avatar: 'https://via.placeholder.com/50' },
//     ],
//   },
//   {
//     id: 4,
//     image: '/image4.jpg',
//     description: 'Sample Image 4',
//     location: 'San Francisco, CA',
//     date: '2024-07-22',
//     likes: 95,
//     author: 'Sarah Lee',
//     avatar: 'https://via.placeholder.com/50',
//     category: 'Nature',
//     initialComments: [
//       { user: 'Gina', text: 'So serene!', avatar: 'https://via.placeholder.com/50' },
//       { user: 'Hank', text: 'Love the colors!', avatar: 'https://via.placeholder.com/50' },
//     ],
//   },
//   {
//     id: 5,
//     image: '/image5.jpg',
//     description: 'Sample Image 5',
//     location: 'Miami, FL',
//     date: '2024-07-21',
//     likes: 70,
//     author: 'James Bond',
//     avatar: 'https://via.placeholder.com/50',
//     category: 'Beach',
//     initialComments: [
//       { user: 'Ivy', text: 'So relaxing!', avatar: 'https://via.placeholder.com/50' },
//       { user: 'Jack', text: 'Great shot!', avatar: 'https://via.placeholder.com/50' },
//     ],
//   },
//   {
//     id: 6,
//     image: '/image6.jpg',
//     description: 'Sample Image 6',
//     location: 'Seattle, WA',
//     date: '2024-07-20',
//     likes: 50,
//     author: 'Anna Taylor',
//     avatar: 'https://via.placeholder.com/50',
//     category: 'Cityscape',
//     initialComments: [
//       { user: 'Kyle', text: 'Awesome city view!', avatar: 'https://via.placeholder.com/50' },
//       { user: 'Laura', text: 'Very vibrant!', avatar: 'https://via.placeholder.com/50' },
//     ],
//   },
//   {
//     id: 7,
//     image: '/image7.jpg',
//     description: 'Sample Image 7',
//     location: 'Boston, MA',
//     date: '2024-07-19',
//     likes: 80,
//     author: 'Tom Hanks',
//     avatar: 'https://via.placeholder.com/50',
//     category: 'Architecture',
//     initialComments: [
//       { user: 'Mia', text: 'Impressive building!', avatar: 'https://via.placeholder.com/50' },
//       { user: 'Nina', text: 'Great composition!', avatar: 'https://via.placeholder.com/50' },
//     ],
//   },
//   // Add more sample data as needed
// ];

// const SearchResultsPage = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get('query') || '';

//   // Filter sampleData based on query (case-insensitive)
//   const filteredData = sampleData.filter(item =>
//     item.description.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Search Results for "{query}"</h1>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
//         {filteredData.length > 0 ? (
//           filteredData.map(item => (
//             <div key={item.id} style={{ flex: '1 0 21%', boxSizing: 'border-box' }}>
//               <DribbbleShot
//                 image={item.image}
//                 description={item.description}
//                 location={item.location}
//                 date={item.date}
//                 likes={item.likes}
//                 author={item.author}
//                 avatar={item.avatar}
//                 category={item.category}
//                 initialComments={item.initialComments}
//               />
//             </div>
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResultsPage;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DribbbleShot from '../common/Post/DribbbleShot';
import axios from 'axios';
import { CircularProgress, LinearProgress } from '@mui/joy';
const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const convertToBase64 = (data) => {
    // Convert binary data to Base64 string
    console.log(data);
    return `data:image/png;base64,${data}`;
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pictures/search', {
          params: { keyword: query } // Ensure the parameter name matches the backend
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
      {loading && <LinearProgress />

      }
      {error && <p>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns:'repeat(3,1fr)', gap: '16px' }}>
        {results.length > 0 ? (
          results.map(item => (
            <div key={item.id} style={{ flex: '1 0 21%', boxSizing: 'border-box' }}>
              <DribbbleShot
                id={item.id}
                image={convertToBase64(item.picture)}
                description={item.description}
                location={item.location}
                date={item.date}
                likes={item.likes}
                author={item.author}
                avatar={item.avatar}
                category={item.category}
                initialComments={item.initialComments}
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
