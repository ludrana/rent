import { Router } from 'express';
import {createOffer, getAllOffers, getFullOffer} from "../controller/offerController.js";
import upload from "../middleware/upload.js";

const router = new Router();

router.get('/offers', getAllOffers);
router.post('/offers', upload.fields([
    { name: 'previewImage', maxCount: 1 },
    { name: 'photos', maxCount: 6 }
]), createOffer);
router.get('/offers/:id', getFullOffer);
export default router;