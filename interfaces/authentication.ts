import { Request } from "express";




interface requestAuthentication extends Request {
    name: string,
    completed: Boolean,
    email: string;
}


export default requestAuthentication;