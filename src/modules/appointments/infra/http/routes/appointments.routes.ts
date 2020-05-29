import { Router } from 'express';

import ensudeAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensudeAuthenticated);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
