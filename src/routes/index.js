import AuthWrapper from '@/components/auth/wrapper';

// Routes
import Auth from './auth';

import Users from './users';
import Projects from './projects';

// Components
import Home from '@/pages/home';

const Root = {
    path: '',
    name: 'dashboard',
    component: Home
};

export default [{
    path: '/',
    component: AuthWrapper,
    children: [
        Root,
        Users,
        Projects
    ]
},
Auth];
