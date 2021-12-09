import React from 'react';
import { Container } from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';

import Footer from '../Footer';
import Nav from '../Nav';

const Page: React.FC = ({ children }) => {
  useEagerConnect();
  return (
    <div className="flex flex-col justify-between">
      <div className="content-wrapper">
        <Nav />
        <Container maxWidth="lg" style={{ paddingBottom: '5rem' }}>
          {children}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
