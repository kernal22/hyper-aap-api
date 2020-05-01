import AuthModel from '../models/auth.model';

class UsersController {
    static getUserDetails(req, res) {
        res.send({status: true, msg: "user details"})
    }

    static async getAllWebList(req, res) {
        try {
            const result = await AuthModel.getAllWebList();
            if(result.length > 0) {
                res.json({status: true, data: result});
            } res.json({status: false});
        } catch (error) {
            res.json({status: false, error: error.message});
        }
    }
}
export default UsersController;