import React from 'react';
import Card from './Card';

export default function CemeteryPoolCard({ title, description, buttonText, onClick, icon }) {
  return (
    <Card innerClass="pt-10 pb-6 px-2 md:px-8" className="relative text-center w-full text-3xl mt-4">
      <div className="flex justify-center absolute w-full left-0 -top-8">
        <div className="flex justify-center w-16 h-16 rounded-full bg-tombGradient -mr-1">
          <img src={icon} width={30} height={30} />
        </div>
      </div>
      <div className="font-Amarante mb-1">{title}</div>
      <div className="font-semibold font-Poppins text-xs text-tomb-purple">{description}</div>
      <button onClick={() => onClick()} className="btn px-6 md:px-10 mb-2 mt-6">
        {buttonText}
      </button>
    </Card>
  );
}
