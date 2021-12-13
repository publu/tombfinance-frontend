import React from 'react';
import Card from './Card.js';

import { numberWithCommas } from '../utils/utils.js';

import ProgressCountdown from './../views/Masonry/components/ProgressCountdown';

export default function MasonryItem({ title, value, time, from, to, description }) {
  console.log(value);
  return (
    <Card className="mt-4" innerClass="p-2 md:p-3 text-center text-3xl">
      <h2 className="text-sm">{title}</h2>
      <div className="font-Amarante">{value ? (value.props ? value : numberWithCommas(value)) : ''}</div>
    </Card>
  );
}
