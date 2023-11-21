import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import Ing from "./pages/Ing"

import Config from "./pages/Config";
import NotFound from "./pages/NotFound";

interface RouterDef {
    path: string,
    name?: string,
    element:JSX.Element
    visible: boolean,
}

export const routeDefs: RouterDef[] = [
    {
        path: "*",
        element: <NotFound />,
        visible: false
    },
    {
        path: "/",
        name: 'Home',
        element: <Home />,
        visible: false
    },
    {
        path: "/config",
        name: 'Config',
        element: <Config />,
        visible: false
    },
    {
        path: "/ing",
        name: 'ing',
        element: <Ing />,
        visible: true
    },
    {
        path: "/about",
        name: 'about',
        element: <About />,
        visible: true
    },
]

export const visibleRoutes = routeDefs.filter(routeDef => routeDef.visible);

export const router = createBrowserRouter(routeDefs);

