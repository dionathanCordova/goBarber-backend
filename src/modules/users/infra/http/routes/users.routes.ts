import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UserRopository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const userRopository = new UserRopository();
        const updateUserAvatar = new UpdateUserAvatarService(userRopository);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });
        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
