import React from 'react';
import useEagerConnect from '../../hooks/useEagerConnect';

import Footer from '../Footer';
import Nav from '../Nav';

const Page: React.FC = ({ children }) => {
  useEagerConnect();
  return (
    <div className="flex flex-col justify-between">
      <div className="content-wrapper">{children}</div>
      <Footer />
    </div>
  );
};

export default Page;
