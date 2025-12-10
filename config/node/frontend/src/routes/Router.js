import {createHashRouter} from "react-router";
import {Home, About, Map, Services, ListOfItems} from './LazyImports';


const routes = createHashRouter(
    [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/map',
            element: <Map/>
        },
        {
            path: '/services',
            element: <Services/>
        },
        {
            path: '/list',
            element: <ListOfItems/>
        },
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '*',
            element: <div>404</div>
        }

    ]
)

export default routes;