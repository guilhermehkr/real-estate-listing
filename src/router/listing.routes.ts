import { Router } from 'express';
import { ListingController } from '../controllers/listing.controller';
import { validateListingMiddleware } from './middleware';

const router = Router();

router.use(validateListingMiddleware);

router.get('/', ListingController.getAll);
router.post('/', ListingController.create);
router.delete('/:id', ListingController.remove);

export default router;
