import AuthBiz from '../biz/auth.biz';

class AuthController {

    static async login(req, res) {

        const {username, password} = {...req.body};

        if(!username || !password) {
            return res.status(400).json({ success: false, message: 'Username or Password is not Supplied' });
        }
        const result = await AuthBiz.login(username, password);
        return res.json(result);
    }

    static async register(req, res) {
        try {
            const reqBody = req.body;
            console.log(reqBody);
            // const result = await AuthBiz.register(reqBody);
            // return res.json(result);
        } catch (error) {
            return res.json({status: false, error: {code: error.code, msg: error.sqlMessage}})
        }
    }
}

export default AuthController;