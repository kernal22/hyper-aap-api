import authService from '../services/authorization.service';

const AuthenticateHeader = {
    verifyHeader: (req, res) => {
        const token = req.headers.authorization;
        authService.verifyToken(token);
        console.log(token);
    }
}

export default AuthenticateHeader;