import {
    createBrowserRouter,
} from "react-router-dom";

import { List } from "../pages/List";
import { Details } from "../pages/Details";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <List />
    },
    {
        path: '/users/:username',
        element: <Details />
    },
])