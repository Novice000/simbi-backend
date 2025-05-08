import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Config from "../config/settings";
import { getUserById } from "../services/user.services";
import { ForbiddenError, NotFoundError } from "../utils/errorClasses";
import { CustomRequest } from "../interfaces/request.interfaces";

export async function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
	if (!req.headers.authorization) {
		next(new ForbiddenError("Unauthorized"));
		return;
	}
	const token = req.headers.authorization.split(" ")[1];
	if (!token) {
		next(new ForbiddenError("Unauthorized"));
		return;
	}
	try {
		const decoded = jwt.verify(token, Config.ACCESS_JWT_SECRET);
		if (!decoded) next(new ForbiddenError("Invalid token"));
		const user = await getUserById(decoded.sub as string);
		if (user) req.user = user;
		else next(new NotFoundError("User not found"));
	} catch (err) {
		next(new ForbiddenError("Unauthorized"));
		return;
	}
    next();
}
