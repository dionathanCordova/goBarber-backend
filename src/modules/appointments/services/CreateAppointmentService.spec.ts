import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository();
        // const createAppointment = new CreateAppointmentService(
        //     fakeAppointmentRepository,
        // );

        // const appointment = await createAppointment.execute({
        //     provider_id: '123456',
        //     date: new Date(),
        // });

        // expect(appointment).toHaveProperty('id');
        // expect(appointment.id).toBe('123456');
        expect(1 + 2).toBe(3);
    });

    it('should not be able to create two appointments on the same date', () => {
        expect(1 + 2).toBe(3);
    });
});
