
import { Request, Response } from "express"
import bcrypt from "bcrypt";
import user from "../models/users"
import SignupRequest from "../interfaces/signup";
import loginRequest from "../interfaces/login";
import jwt from "jsonwebtoken"
import { Document } from "mongoose";

export const signupController = async (req: Request<{}, {}, SignupRequest>, res: Response) => {
    try {
        const { name, age, email, password } = req.body;
        if (!name || !age || !email || !password) {
            return res.status(400).json({ error: "invalid user detail" })
        }
        const isUserPresent = await user.findOne({ email });
        if (isUserPresent) {
            return res.status(400).json({ error: "user alreday present" })
        }
        const hashedPassword: string = await bcrypt.hash(password, 10);
        const newUser = new user({
            name,
            age,
            email,
            password: hashedPassword
        })
        await newUser.save();
        return res.status(200).json({ message: "new user saved successfully" })
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

export const loginController = async (req: Request<{}, {}, loginRequest>, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "invalid login details" })
        }
        
        const userDetails = await user.findOne({ email })
        const userDetailsWithPassword = userDetails as unknown as { password: string };
        if (!userDetails) {
            return res.status(400).json({ error: "user is not present" })
        }
        const passwordCheck =await  bcrypt.compare(password, userDetailsWithPassword.password);
        if (!passwordCheck) {
            return res.status(400).json({ error: "invalid login credentials" })
        }
        const token = jwt.sign({ email }, "secretkey", { expiresIn: "1h" })
        return res.status(200).json(token);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}