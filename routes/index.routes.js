import {Router} from 'express';

import authenticate from './authenticate.routes';
import user from './users.routes';

export default() => {
    let api = Router();

    api.use('/authenticate', authenticate());
    
    api.use('/user', user());

    return api;
}