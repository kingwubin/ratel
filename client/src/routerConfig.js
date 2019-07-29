import Login from './pages/Login';
import Menu from './pages/Menu';
import Test from './pages/Test';

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
  {
    path: '/test',
    component: Test,
    exact: true,
  },
];

export default routerConfig;
