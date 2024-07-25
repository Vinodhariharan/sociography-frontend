import React from 'react';
import './PartnerList.css';

const PartnerCard = ({ title, description, imageUrl }) => {
  return (
    <div className="partner-card">
      <div className="image-container">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="button-container">
        <button>Connect</button>
      </div>
    </div>
  );
};

export default PartnerCard;
