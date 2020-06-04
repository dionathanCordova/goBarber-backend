import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider,
        private userToken: IUsersTokenRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (!checkUserExists) {
            throw new AppError('User does not exist');
        }

        await this.userToken.generate(checkUserExists.id);

        this.mailProvider.sendMail(email, 'Pedido recuperação de senha');
    }
}

export default SendForgotPasswordEmailService;
