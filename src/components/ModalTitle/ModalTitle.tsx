import React from 'react';

interface ModalTitleProps {
  text?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <h1 className="font-Amarante text-2xl mb-4 font-bold text-center">{text}</h1>
);

export default ModalTitle;
