import {Offer} from '../model/offer.js';
import ApiError from "../error/apiError.js";
import {adaptOfferToClient, adaptSingleOfferToClient} from "../adapter/offerAdapter.js";
import {User} from "../model/user.js";

async function getAllOffers(req, res, next) {
    try {
        const offers = await Offer.findAll();
        const adapted = offers.map(el => adaptOfferToClient(el));
        res.send(adapted);
    } catch (error) {
        console.error('Не удалось получить список предложений:', error);
    }
}

export const getFullOffer = async (req, res, next) => {
    try {
        const { id } = req.params;

        const offer = await Offer.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'author'
                }
            ]
        });

        if (!offer) {
            return next(ApiError.badRequest('Offer not found'));
        }

        const offerData = adaptSingleOfferToClient(offer);

        res.json(offerData);
    } catch (error) {
        console.error('Error fetching offer:', error);
        return next(ApiError.internal('womp womp'));
    }
};

export async function createOffer(req, res, next) {
    try {
        const {
            title, description, publishDate, city,
            isPremium, isFavorite, rating, type, rooms, guests, price,
            features, commentsCount, latitude, longitude, userId
        } = req.body;


        if (!req.files?.previewImage || req.files.previewImage.length === 0) {
            return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
        }


        const previewImagePath = `/static/${req.files.previewImage[0].filename}`;


        let processedPhotos = [];
        if (req.files?.photos) {
            processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
        }


        let parsedFeatures = [];
        if (features) {
            try {
                parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
            } catch {
                parsedFeatures = features.split(',');
            }
        }


        const offer = await Offer.create({
            title,
            description,
            publishDate,
            city,
            previewImage: previewImagePath,
            photos: processedPhotos,
            isPremium,
            isFavorite,
            rating,
            type,
            rooms,
            guests,
            price,
            features: parsedFeatures,
            commentsCount,
            latitude,
            longitude,
            authorId: userId
        });


        return res.status(201).json(offer);
    } catch (error) {
        next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
    }
}

export {getAllOffers};