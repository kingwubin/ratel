import { hot } from 'react-hot-loader/root';
import React from 'react';
import Layout from '@icedesign/layout';
import MainRoutes from './MainRoutes';
import Header from './components/Header';

function BasicLayout() {
  return (
    <div>
      <Layout>
        <Header />
        <Layout.Main>
          <MainRoutes />
        </Layout.Main>
      </Layout>
    </div>
  );
}

export default hot(BasicLayout);
