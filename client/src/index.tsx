import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from "./components/app/app";
import {S} from "./const";
import {offers} from './mock/offer'
import {offersList} from "./mock/offer-list";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App
            rentalOffersCount={S.rentalOffersCount}
            offers={offers}
            offlist={offersList}
        />
    </StrictMode>,
)
