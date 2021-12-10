import React from 'react';
import Card from './Card.js';

export default function MasonryItem({ title, value }) {
  return (
    <Card className="mt-4" innerClass="p-2 md:p-4 text-center text-3xl">
      <h2 className="text-sm">{title}</h2>
      <h3 className="font-Amarante">{value}</h3>
    </Card>
  );
}
