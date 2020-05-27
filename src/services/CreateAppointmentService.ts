import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointments from '../models/Appointments';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateTransactionService {
  public async execute({ provider_id, date }: Request): Promise<Appointments> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateTransactionService;
