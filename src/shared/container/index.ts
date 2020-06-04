import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmentRepository>(
    'AppintmentRepositoy',
    AppointmentsRepository,
);

container.registerSingleton<IUsersTokenRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);
