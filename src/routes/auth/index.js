import PublicPage from '@/pages/public';
import LoginPage from '@/pages/auth/login';
import CallbackPage from '@/pages/auth/callback';

export default {
    path: '/auth',
    component: PublicPage,
    children: [{
        name: 'login',
        path: 'login',
        component: LoginPage
    }, {
        name: 'callback',
        path: 'callback',
        component: CallbackPage
    }]
}
