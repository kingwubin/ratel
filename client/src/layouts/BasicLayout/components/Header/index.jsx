import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import style from './Header.less';

function caseToRender(path, children) {
  switch (path) {
    case '/Login':
      return '';
    default:
      return (
        <ul className={style.header}>
          <li>
            <span />
            <span>
            运维可视化系统
            </span>
          </li>
          <li>
            {children}
          </li>
          <li>
            <Link to="/AlarmManagement" target="_self" />
            <Link to="/AlarmManagement" target="_self" />
            <Link to="/AlarmManagement" target="_self" />
            <Link to="/AlarmManagement" target="_self" />
            <Link to="/AlarmManagement" target="_self" />
            <Link to="/AlarmManagement" target="_self" />
          </li>
        </ul>
      );
  }
}

@withRouter
class Header extends Component {
  static get propTypes() {
    return {
      location: PropTypes.any, // eslint-disable-line
      children: PropTypes.any, // eslint-disable-line
    };
  }

  render() {
    const { location, children } = this.props;
    return caseToRender(location && location.pathname, children);
  }
}

export default Header;
