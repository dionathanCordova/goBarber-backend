import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com',
            password: '123456',
        });

        expect(user.name).toBe('John Doe');
    });

    it('should not be able to create two account with same email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com',
            password: '123456',
        });

        expect(
            createUser.execute({
                name: 'John Doe',
                email: 'johndoe@teste.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
