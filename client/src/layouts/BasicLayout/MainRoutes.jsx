import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import routerConfig from '../../routerConfig';
import NotFound from '../../components/NotFound';

export default class MainRoutes extends React.Component {
  /*
  *  渲染路由
  * */
  renderNormalRoute = (item, index) => (item.component ? (
    <Route
      key={index}
      path={item.path}
      component={item.component}
      exact={item.exact}
    />
  ) : null)

  render() {
    return (
      <Switch>
        {/* 渲染路由表 */}
        {routerConfig.map(this.renderNormalRoute)}
        {/* 首页默认重定向到 ／Login */}
        <Redirect exact from="/" to="/Login" />
        {/* 未匹配到的路由重定向到 <Guide> 组件，实际情况应该重定向到 404 */}
        <Route component={NotFound} />
      </Switch>
    );
  }
}
