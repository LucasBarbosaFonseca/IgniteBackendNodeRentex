import { Router } from 'express';

import { authenticateRoutes } from '../routes/authenticate.routes';
import { categoriesRoutes } from '../routes/categories.routes';
import { specificationsRoutes } from '../routes/specifications.routes';
import { usersRoutes } from '../routes/users.routes';
import { carsRoutes } from '../routes/cars.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from '../routes/rental.routes';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);
router.use(authenticateRoutes);

export { router };