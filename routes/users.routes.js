import {Router} from 'express';
import UsersController from '../src/controller/user.controller';
import AuthenticateHeader from '../src/middleware/authenticate.middleware';

let users = () => {
    let api = Router();
    // api.use(AuthenticateHeader.verifyHeader);

    api.get('/getUserDetails', UsersController.getUserDetails);
    api.get('/getAllWebList', [AuthenticateHeader.verifyHeader], UsersController.getAllWebList);

    return api;
};

export default users;