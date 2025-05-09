import { Router } from 'express';
import {getAllOffers} from "../controller/offerController.js";

const router = new Router();

router.get('/offers', getAllOffers);

export default router;