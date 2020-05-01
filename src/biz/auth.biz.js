import AuthModel from '../models/auth.model';
import authService from '../services/authorization.service';

class AuthBiz {
    static async login(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const details = {};
                const isUser = await AuthModel.chekcUserExist(username);
                if(! isUser) {
                    return resolve({status: false, message: "Unauthorized"});
                }
                const dbPassword = isUser.password;
                const isvalidPassword = await authService.comparePassword(password, dbPassword);
                
                if(! isvalidPassword) {
                    return resolve({status: false, message: "Unauthorized"});
                }

                const token = await authService.generateToken(isUser);
                details['token'] = token
                details['name'] = isUser.name;
                details['username'] = isUser.username;

                return resolve({status: true, data: details});
            } catch (error) {
                return reject(error);
            }
        });
    }

    static async register(reqBody) {
        return new Promise(async (resolve, reject) => {
            try {
                const password = reqBody.password;
                const encyptedPassword =  authService.encryption(password);
                reqBody['password'] = encyptedPassword;

                const result = await AuthModel.saveUserRegistrationDetais(reqBody);
                if(result) {
                    return resolve({status: true, "message": "Registration done successfully"});
                } else {
                    return resolve({status: false, "message": "Username already exist"});
                }
            } catch (error) {
                return reject(error);
            }
        });
    }
}

export default AuthBiz;