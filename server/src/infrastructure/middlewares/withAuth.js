import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.Authorization
    if (!token) {
        // TODO gérer le fait de ne aps avoir
        throw new Error('No Token found');
    } else {
        const isVerified = jwt.verify(token, 'SECRET')

        if (isVerified) {
            return next();
        } else {
            throw new Error('Not Authorized');
        }
    }
}
