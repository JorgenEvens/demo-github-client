// Routes
import Users from './users';

// Components
import Home from '@/pages/home';

const Root = {
    path: '/',
    name: 'home',
    component: Home
};

export default [
    Root,
    Users
];
