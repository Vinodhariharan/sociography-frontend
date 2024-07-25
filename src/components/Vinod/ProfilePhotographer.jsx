import React from 'react';
import ProfileAvatar from './ProfileAvatar';

// Example functional component
const MyComponent = () => {
    const localImage = require('./Sociography/src/assets/profilepic1.jpg').default;
  return (
    <div>
      <ProfileAvatar imageUrl={localImage} altText={"altText"} />
      <p>This is a basic JSX example.</p>
    </div>
  );
}

export default MyComponent;
