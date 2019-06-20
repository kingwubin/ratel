import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getStore from './configureStore';
import Router from './router';
// 引入默认全局样式
import 'antd/dist/antd.css';
import './utils/css/reset.css';

const store = getStore();
const RATEL_CONTAINER = document.getElementById('ratel');

if (!RATEL_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ratel"></div> 节点.');
}

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  RATEL_CONTAINER,
);
