import Login from './pages/Login';
import Menu from './pages/Menu';

const routerConfig = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/menu',
    component: Menu,
    exact: true,
  },
];

export default routerConfig;
