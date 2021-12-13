import React from 'react';

const WalletCard = ({ icon, onConnect, title, className }) => (
  <button
    onClick={onConnect}
    className={`${className} flex items-center border-2 px-4 py-2 rounded-full hover:bg-white hover:bg-opacity-20`}
  >
    <span className="mr-1 w-12 flex" style={{ height: '2rem' }}>
      {icon}
    </span>
    <span>{title}</span>
  </button>
);

export default WalletCard;
