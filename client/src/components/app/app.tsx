import {MainPage} from "../../pages/main-page/main-page";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Favorites} from "../../pages/favorites/favorites";
import {Offer} from "../../pages/offer/offer";
import ErrorPage from "../../pages/error-page/error-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/favorites",
        element: <Favorites/>
    },
    {
        path: "/offer",
        element: <Offer/>
    }
]);

function App() {
    return (<RouterProvider router={router}/>);
}

export {App};