import { Request } from "express";
import { User } from "../prisma/generated/prisma";

export interface CustomRequest extends Request {
    user?: Partial<User>;
}