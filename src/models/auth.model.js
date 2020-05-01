import sequelize from '../db/index';
import User from '../schema/user.schema';
import mysql from '../db/index';

class AuthModel {

    static async chekcUserExist(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = 'select username, password, name, phone from user_detail where username = ?';
                const result = await mysql.execute(query, [username]);
                console.log(result);
                if(result.length > 0) {
                    return resolve(result[0]);
                } return resolve(null);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static async saveUserRegistrationDetais(reqBody) {
        return new Promise(async (resolve, reject) => {
            try {
                const userValid = await this.checkUsernameExistOrNot(reqBody.username);
                if(userValid) {
                    const query = 'insert into user_detail (username, password, phone, name) values (?, ?, ?, ?)';
                    const result = await mysql.execute(query, [reqBody.username, reqBody.password, reqBody.phone, reqBody.name]);
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            } catch (error) {
                return reject(error);
            }
        });
    }

    static async checkUsernameExistOrNot(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = 'select username from user_detail where username = ?';
                const result = await mysql.execute(query, [username]);
                // console.log(result);
                if(result.length > 0) {
                    return resolve(false);
                } else {
                    return resolve(true);
                }
            } catch (error) {
                return reject(error);
            }
        });
    }

    static async getAllWebList() {
        return new Promise(async (resolve, reject) => {
            try {
                const query = 'select * from website_lists';
                const result = await mysql.execute(query, []);
                if(result.length > 0) {
                    return resolve(result);
                } else {
                    return resolve(null);
                }
            } catch (error) {
                return reject(error);
            }    
        })
    }
}

export default AuthModel;

