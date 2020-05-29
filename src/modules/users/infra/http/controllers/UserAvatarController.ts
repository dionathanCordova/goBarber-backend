import { Request, Response } from 'express';

import UserRopository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userRopository = new UserRopository();
        const updateUserAvatar = new UpdateUserAvatarService(userRopository);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });
        delete user.password;

        return response.json(user);
    }
}
