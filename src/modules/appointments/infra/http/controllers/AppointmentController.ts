import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

export default class AppointmentContoller {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const appointmentsRepository = new AppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            appointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            provider_id,
            date: parsedDate,
        });

        return response.json(appointment);
    }
}
