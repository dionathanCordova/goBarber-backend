import Appointment from '../infra/typeorm/entities/Appointments';

export default interface IAppointments {
    // create(): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}
