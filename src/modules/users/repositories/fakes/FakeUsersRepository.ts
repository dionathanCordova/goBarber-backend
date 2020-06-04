import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class UsersRepository implements IUserRepository {
    private userRepository: User[] = [];

    public async findById(user_id: string): Promise<User | undefined> {
        const findUser = this.userRepository.find(user => user.id === user_id);

        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.userRepository.find(user => user.email === email);

        return findUser;
    }

    public async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        user.id = uuid();
        user.name = name;
        user.email = email;
        user.password = password;

        this.userRepository.push(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        const findUser = this.userRepository.findIndex(
            finduser => finduser.id === user.id,
        );

        this.userRepository[findUser] = user;

        return user;
    }
}

export default UsersRepository;
