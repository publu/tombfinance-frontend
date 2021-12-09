import React from 'react';

export default function Card({ className, children, paddingClass, innerClass }) {
  return (
    <div className={`${className} relative`}>
      <div className={`gradient w-full h-full`} />
      <div className={`inner ${paddingClass} bg-tombBackground ${innerClass}`}>{children}</div>
    </div>
  );
}
