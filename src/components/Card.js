import React from 'react';

export default function Card({ className, children, innerClass }) {
  return (
    <div className={`${className} relative`}>
      <div className={`gradient w-full h-full`} />
      <div className={`inner bg-tombBackground ${innerClass}`}>{children}</div>
    </div>
  );
}
