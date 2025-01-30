import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ status: 401, message: 'Unauthorized' });
        return; // Ensure void return
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
        if (err) {
            res.status(403).json({ status: 403, message: 'Token is invalid' });
            return; // Ensure void return
        }

        req.user = user as AuthUser; // Assuming AuthUser type exists
        next(); // Call next() to continue request
    });
};

export default authMiddleware;
