import React from 'react';
import Button from '../Button';

const WalletCard = ({ icon, onConnect, title }) => (
  <Button onClick={onConnect} className="btn flex items-center">
    <span className="mr-1 w-12 flex" style={{ height: '2rem' }}>
      {icon}
    </span>
    <span>{title}</span>
  </Button>
);

export default WalletCard;

// :)
