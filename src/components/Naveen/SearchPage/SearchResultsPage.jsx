import React from 'react';
import { useLocation } from 'react-router-dom';
import DribbbleShot from "../../common/DribbbleShot";

const sampleData = [
  {
    id: 1,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 1',
    location: 'New York, NY',
    date: '2024-07-25',
    likes: 120,
    author: 'John Doe',
    avatar: 'https://via.placeholder.com/50',
    category: 'Landscape',
    initialComments: [
      { user: 'Alice', text: 'Beautiful!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Bob', text: 'Amazing shot!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 2',
    location: 'Los Angeles, CA',
    date: '2024-07-24',
    likes: 85,
    author: 'Jane Smith',
    avatar: 'https://via.placeholder.com/50',
    category: 'Portrait',
    initialComments: [
      { user: 'Charlie', text: 'Incredible!', avatar: 'https://via.placeholder.com/50' },
      { user: 'David', text: 'Love it!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 3',
    location: 'Chicago, IL',
    date: '2024-07-23',
    likes: 60,
    author: 'Michael Johnson',
    avatar: 'https://via.placeholder.com/50',
    category: 'Urban',
    initialComments: [
      { user: 'Eve', text: 'Fantastic!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Frank', text: 'Great work!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 4',
    location: 'San Francisco, CA',
    date: '2024-07-22',
    likes: 95,
    author: 'Sarah Lee',
    avatar: 'https://via.placeholder.com/50',
    category: 'Nature',
    initialComments: [
      { user: 'Gina', text: 'So serene!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Hank', text: 'Love the colors!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 5',
    location: 'Miami, FL',
    date: '2024-07-21',
    likes: 70,
    author: 'James Bond',
    avatar: 'https://via.placeholder.com/50',
    category: 'Beach',
    initialComments: [
      { user: 'Ivy', text: 'So relaxing!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Jack', text: 'Great shot!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 6',
    location: 'Seattle, WA',
    date: '2024-07-20',
    likes: 50,
    author: 'Anna Taylor',
    avatar: 'https://via.placeholder.com/50',
    category: 'Cityscape',
    initialComments: [
      { user: 'Kyle', text: 'Awesome city view!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Laura', text: 'Very vibrant!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 7',
    location: 'Boston, MA',
    date: '2024-07-19',
    likes: 80,
    author: 'Tom Hanks',
    avatar: 'https://via.placeholder.com/50',
    category: 'Architecture',
    initialComments: [
      { user: 'Mia', text: 'Impressive building!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Nina', text: 'Great composition!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 8',
    location: 'Austin, TX',
    date: '2024-07-18',
    likes: 90,
    author: 'Emma Stone',
    avatar: 'https://via.placeholder.com/50',
    category: 'Festival',
    initialComments: [
      { user: 'Oscar', text: 'Fun atmosphere!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Pia', text: 'Great capture!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 9,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 9',
    location: 'Denver, CO',
    date: '2024-07-17',
    likes: 110,
    author: 'Robert Downey',
    avatar: 'https://via.placeholder.com/50',
    category: 'Mountain',
    initialComments: [
      { user: 'Quinn', text: 'Stunning view!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Rita', text: 'Breathtaking!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 10,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 10',
    location: 'Philadelphia, PA',
    date: '2024-07-16',
    likes: 65,
    author: 'Julia Roberts',
    avatar: 'https://via.placeholder.com/50',
    category: 'Street',
    initialComments: [
      { user: 'Steve', text: 'Very lively!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Tina', text: 'Great street shot!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 11,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 11',
    location: 'San Diego, CA',
    date: '2024-07-15',
    likes: 55,
    author: 'Chris Evans',
    avatar: 'https://via.placeholder.com/50',
    category: 'Sunset',
    initialComments: [
      { user: 'Uma', text: 'Gorgeous sunset!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Vera', text: 'So beautiful!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 12,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 12',
    location: 'Portland, OR',
    date: '2024-07-14',
    likes: 45,
    author: 'Natalie Portman',
    avatar: 'https://via.placeholder.com/50',
    category: 'Forest',
    initialComments: [
      { user: 'Will', text: 'Amazing forest!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Xena', text: 'Very serene!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 13,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 13',
    location: 'Baltimore, MD',
    date: '2024-07-13',
    likes: 75,
    author: 'Hugh Jackman',
    avatar: 'https://via.placeholder.com/50',
    category: 'Historical',
    initialComments: [
      { user: 'Yara', text: 'Great historical shot!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Zane', text: 'Very interesting!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  {
    id: 14,
    image: 'https://via.placeholder.com/400x300',
    description: 'Sample Image 14',
    location: 'New Orleans, LA',
    date: '2024-07-12',
    likes: 100,
    author: 'Scarlett Johansson',
    avatar: 'https://via.placeholder.com/50',
    category: 'Cultural',
    initialComments: [
      { user: 'Amy', text: 'Love the culture!', avatar: 'https://via.placeholder.com/50' },
      { user: 'Brian', text: 'Very vibrant!', avatar: 'https://via.placeholder.com/50' },
    ],
  },
  // Add more sample data as needed
];

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  // Filter sampleData based on query (case-insensitive)
  const filteredData = sampleData.filter(item =>
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Results for "{query}"</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <div key={item.id} style={{ flex: '1 0 21%', boxSizing: 'border-box' }}>
              <DribbbleShot
                image={item.image}
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
