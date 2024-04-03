import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import users from "../models/users"
import requestAuthentication from "../interfaces/authentication";


export const authenticationMiddleware = async (req: requestAuthentication, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const decodedToken: any = jwt.verify(token, "secretkey");
        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const isuserPresent = await users.findOne({ email: decodedToken.email })
        if (!isuserPresent) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.body.email = decodedToken.email;
        next()
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}