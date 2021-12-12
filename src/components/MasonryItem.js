import React from 'react';
import Card from './Card.js';

import ProgressCountdown from './../views/Masonry/components/ProgressCountdown';

export default function MasonryItem({ title, value, time, from, to, description }) {
  return (
    <Card className="mt-4" innerClass="p-2 md:p-3 text-center text-3xl">
      <h2 className="text-sm">{title}</h2>
      <div className="font-Amarante">
        {time ? <ProgressCountdown hideBar={true} base={from} deadline={to} description={description} /> : value}
      </div>
    </Card>
  );
}
