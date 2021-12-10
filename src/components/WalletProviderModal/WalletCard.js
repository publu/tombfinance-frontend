import React from 'react';
import { Button } from '@material-ui/core';

const WalletCard = ({ icon, onConnect, title }) => (
  <Button fullWidth onClick={onConnect} className="btn">
    <span style={{ marginRight: '1rem', height: '2rem' }}>{icon}</span>
    <span>{title}</span>
  </Button>
);

export default WalletCard;

// :)
