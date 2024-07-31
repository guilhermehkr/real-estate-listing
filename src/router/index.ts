import { Router } from 'express';

import listingRouter from './listing.routes';

const router = Router();

router.use('/listings', listingRouter);

export default router;
