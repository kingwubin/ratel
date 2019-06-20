/*
* 定义路由
* */
import { HashRouter, Route } from 'react-router-dom';
import React from 'react';
import BasicLayout from './layouts/BasicLayout';

export default function Router() {
  return (
    <HashRouter>
      <div>
        <Route path="/" component={BasicLayout} />
      </div>
    </HashRouter>
  );
}
