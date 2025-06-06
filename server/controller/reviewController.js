import ApiError from "../error/apiError.js";
import {Review} from "../model/review.js";
import {adaptReviewToClient} from "../adapter/reviewAdapter.js";
import {User} from "../model/user.js";

const addReview = async (req, res, next) => {
    try {
        const {comment, rating} = req.body;
        const offerId = req.params.offerId;
        const userId = req.user.id;

        if (!comment || !rating || !offerId) {
            return next(ApiError.badRequest('Не хватает данных для комментария'));
        }

        const review = await Review.create({
            text: comment,
            rating,
            authorId: userId,
            OfferId: offerId
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        next(ApiError.badRequest('Ошибка при добавлении комментария'));
    }
};

const getReviewsByOfferId = async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            where: {OfferId: req.params.offerId},
            include: {model: User, as: 'author'},
            order: [['publishDate', 'DESC']]
        });

        const adaptedReviews = reviews.map(adaptReviewToClient);
        res.json(adaptedReviews);
    } catch (error) {
        console.error(error);
        next(ApiError.internal('Ошибка при получении комментариев'));
    }
};

export {addReview, getReviewsByOfferId};