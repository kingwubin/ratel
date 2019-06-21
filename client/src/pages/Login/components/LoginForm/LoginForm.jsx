import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import { login } from '../../../../api/login';
import style from './LoginForm.less';

@withRouter
class LoginForm extends Component {
  static get propTypes() {
    return {
      history: PropTypes.any, // eslint-disable-line
    };
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
    this.userName = React.createRef();
    this.userPassword = React.createRef();
  }

  handleChange = (event) => {
    this.userName.current.style.border = '2px solid #4ca7de';
    this.userPassword.current.style.border = '2px solid #4ca7de';
    this.userName.current.setCustomValidity('');
    this.userPassword.current.setCustomValidity('');
    const key = event.target.name;
    this.setState({
      [key]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    const { name, password } = this.state;
    const { history } = this.props;;
    event.preventDefault();
    if (name === '') {
      this.userName.current.setCustomValidity('用户名不能为空');
      this.userName.current.style.border = '2px solid #f00';
      return;
    }
    if (password === '') {
      this.userPassword.current.setCustomValidity('请输入密码');
      this.userPassword.current.style.border = '2px solid #f00';
      return;
    }
    login(name, password).then((res) => {
      if (res.data && res.data.errno === 0) {
        history.push('/menu');
        return;
      }
      message.info('请输入正确的用户名和密码');
    });
  };

  render() {
    const { name, password } = this.state;
    return (
      <section className={style.login}>
        <div className={style.loginTitle} />
        <form className={style.loginForm} method="POST">
          <label />
          <input
            name="name"
            type="text"
            ref={this.userName}
            placeholder="请输入用户名"
            value={name}
            onChange={this.handleChange}
            className={style.userName}
          />
          <input
            ref={this.userPassword}
            name="password"
            type="password"
            placeholder="请输入用户密码"
            value={password}
            onChange={this.handleChange}
            className={style.passWord}
          />
          <input type="submit" value="登        录" className={style.submit} onClick={this.handleSubmit} />
        </form>
      </section>
    );
  }
}

export default LoginForm;
