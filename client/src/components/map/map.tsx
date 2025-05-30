import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {FullOffer, OffersList} from "../../types/offer";

// Исправление отображения иконок маркеров
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Типы
type MapProps = {
    offers: FullOffer | OffersList[];
};

export default function Map({ offers }: MapProps) {
    // Приводим входящие данные к массиву
    const offersArray = Array.isArray(offers) ? offers : [offers];

    // Если нет координат — не рендерим карту
    if (!offersArray.some((offer) => offer.location)) return null;

    // Определяем центр карты (первое предложение)
    const firstLocation = offersArray.find((offer) => offer.location)?.location;
    const defaultCenter = firstLocation
        ? [firstLocation.latitude, firstLocation.longitude]
        : [51.505, -0.09]; // дефолтное значение (Лондон)

    return (
        <section className="map" style={{ height: '100%', width: '100%' }}>
            <MapContainer
                center={defaultCenter}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>  contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Рендерим маркеры для каждого предложения */}
                {offersArray.map((offer) => {
                    const { latitude, longitude } = offer.location;
                    if (!latitude || !longitude) return null;

                    const position: [number, number] = [latitude, longitude];

                    return (
                        <Marker key={offer.id} position={position}>
                            <Popup>{offer.title || `Offer #${offer.id}`}</Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </section>
    );
}