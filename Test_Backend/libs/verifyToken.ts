import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayLoad {
    id: number,
    iat: number,
    exp: number
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('auth-token');
        if (!token) return res.status(401).json('Access denied');

        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayLoad;
        req.userId = payload.id;
        next();
    } catch (error) {
        res.status(500).json({
            msg: 'Token Expired'
        })
    }

}