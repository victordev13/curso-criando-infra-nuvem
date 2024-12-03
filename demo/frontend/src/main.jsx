import { render } from 'preact';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Layout from './pages/Layout';
import UsersList from './pages/UsersList';
import UsersCreate from './pages/UsersCreate';
import Home from './pages/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'users',
                element: <UsersList/>,
            },
            {
                path: 'users/create',
                element: <UsersCreate/>,
            },
        ],
    },
]);

render(<RouterProvider router={router}/>, document.getElementById('app'));
