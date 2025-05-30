import {MainPage} from "../../pages/main-page/main-page";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Favorites} from "../../pages/favorites/favorites";
import {Offer} from "../../pages/offer/offer";
import ErrorPage from "../../pages/error-page/error-page";
import Login from "../../pages/login/login";
import {JSX} from "react";
import {AppRoute, AuthorizationStatus} from "../../const";
import {PrivateRoute} from "../private-route/private-route";
import {FullOffer, OffersList} from "../../types/offer";
import 'leaflet/dist/leaflet.css';

type AppMainPageProps = {
    rentalOffersCount: number
    offers: FullOffer[]
    offlist: OffersList[]
}

function App({rentalOffersCount, offers, offlist}: AppMainPageProps): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={AppRoute.Main}
                    element={<MainPage rentalOffersCount={rentalOffersCount} offerList={offlist}/>}
                />
                <Route
                    path={AppRoute.Favorites}
                    element={
                        <PrivateRoute
                            authorizationStatus={AuthorizationStatus.NoAuth}
                        >
                            <Favorites offers={offlist}/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path={AppRoute.Login}
                    element={<Login/>}
                />
                <Route path={`${AppRoute.Offer}/:id`} element={<Offer offers={offers} />} />
                <Route
                    path='*'
                    element={<ErrorPage/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export {App};