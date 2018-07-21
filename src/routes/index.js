// Routes
import Users from './users';

// Components
import HelloWorld from '@/components/HelloWorld';

const Root = {
    path: '/',
    name: 'home',
    component: HelloWorld
};

export default [
    Root,
    Users
];
