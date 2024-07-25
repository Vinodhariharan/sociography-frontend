import React from 'react';
import PartnerCard from './PartnerCard';
import './PartnerList.css';
import pic1 from '../pics/1307360.jpeg';
import pic2 from '../pics/gin2.jpeg';
import pic3 from '../pics/spike1.png';

const partners = [
  {
    id: 1,
    title: 'Google',
    description: 'We are looking for Photographs representing the company\'s best interest.',
    imageUrl: pic1,
  },
  {
    id: 2,
    title: 'Microsoft',
    description: 'We are in search of talents who can capture our visions with a lens.',
    imageUrl: pic2,
  },
  {
    id: 3,
    title: 'Rediffmail',
    description: 'On a search for spectacular modern landscapes for our site.',
    imageUrl: pic3,
  },
];

const PartnerList = () => {
  return (
    <div className="partner-list">
      {partners.map(partner => (
        <PartnerCard
          key={partner.id}
          title={partner.title}
          description={partner.description}
          imageUrl={partner.imageUrl}
        />
      ))}
    </div>
  );
};

export default PartnerList;
