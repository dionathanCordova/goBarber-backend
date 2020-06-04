import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(fakeUsersRepository);
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
        );

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com',
            password: '123456',
        });

        const userAuth = await authenticateUser.execute({
            email: 'johndoe@teste.com',
            password: '123456',
        });

        expect(userAuth).toHaveProperty('token');
    });

    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
        );

        expect(
            authenticateUser.execute({
                email: 'johndoe@teste.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(fakeUsersRepository);
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
        );

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com',
            password: '123456',
        });

        expect(
            authenticateUser.execute({
                email: 'johndoe@teste.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
