import {createBrowserRouter} from 'react-router-dom';
import {Home} from './Lazyimports';
const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '',
            element: <div>404</div>
        }
    ]
)
export default routes;