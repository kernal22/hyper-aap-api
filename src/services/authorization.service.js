import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import config from '../config';

const authService = {
    encryption:  (password) => {
        const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);
        return hash;
    },
    
    comparePassword: (plainPassword, hashPassword) => {
        const isVlaid = bcrypt.compareSync(plainPassword, hashPassword);
        return isVlaid;
    },

    generateToken: (userData) => {

        // PAYLOAD
        const payload = {
           username: userData.username,
           name: userData.name,
           phone: userData.phone
        };

        // PRIVATE and PUBLIC key
        const privateKey = fs.readFileSync(__dirname + '/../private.key', 'utf-8');

        const issuer = 'dezigndia';
        const subject = userData.username;

        // SIGNING OPTIONS
        const signOptions = {
            issuer:  issuer,
            // subject: subject,
            expiresIn:  "1h",
            algorithm:  "RS256"
        };

        //Token generation
        let token = jwt.sign(payload, privateKey, signOptions);
        return token;
    },

    decodeToken: (token) => {
        const decoded = jwt.decode(token, {complete: true});
        console.log(decoded);
    },

    verifyToken: (token) => {
        const publiceKey = fs.readFileSync(__dirname + '/../public.key', 'utf-8');

        const verifyOptions = {
            issuer:  'dezigndia',
            expiresIn:  "1h",
            algorithm:  ["RS256"]
           };
           const isValidToken = jwt.verify(token, publiceKey, verifyOptions);
        //    console.log(legit);
    }
}
export default authService;