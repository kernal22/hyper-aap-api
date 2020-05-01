import {Router} from 'express';
import AuthController from '../src/controller/auth.controller';
import middleware from '../src/middleware/validateRequest';

let authenticate = () => {
    const api = Router();

    api.post('/login', AuthController.login);
    api.post('/register', [middleware.validateRegister], AuthController.register);
    
    return api
}

export default authenticate