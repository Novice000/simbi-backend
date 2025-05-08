import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../interfaces/request.interfaces";
import {
	getUserById,
	getUserByEmail,
	createUser,
	updateUser,
	deleteUser,
} from "../services/user.services";
import { ForbiddenError } from "../utils/errorClasses";
import { hash, compare } from "bcrypt";
import Config from "../config/settings";
import { genereteJWTToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

export async function signUp(req: Request, res: Response, next: NextFunction) {
	const user_info = req.body;
	const existing_user = await getUserByEmail(user_info.email);
	if (!existing_user) {
		user_info.passwordHash = await hash(user_info.password, Config.SALT_ROUNDS);
		delete user_info.password;
		const user = await createUser(user_info);
		res.status(201).json({ status: "success", message: "User created successfully", user });
		return;
	}
	next(new ForbiddenError("User already exists"));
	return;
}

export async function login(req: Request, res: Response, next: NextFunction) {
	const user_to_login = req.body;
	const user = await getUserByEmail(user_to_login.email);
	if (user) {
		const isPasswordValid = await compare(user_to_login.password, user.passwordHash);
		if (isPasswordValid) {
			const access_token = genereteJWTToken(user.id, "access");
			const refresh_token = genereteJWTToken(user.id, "refresh");
			res.status(200).json({
				status: "success",
				message: "User logged in successfully",
				access_token,
				refresh_token,
			});
			return;
		}
	}
	next(new ForbiddenError("Invalid credentials"));
	return;
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
	const { refreshToken } = req.body;
	if (!refreshToken) {
		next(new ForbiddenError("Unauthorized"));
		return;
	}
	try {
		const decoded = jwt.verify(refreshToken, Config.REFRESH_JWT_SECRET);
		if (!decoded) next(new ForbiddenError("Invalid token"));
		const user = await getUserById(decoded.sub as string);
		if (user) {
			const access_token = genereteJWTToken(user.id, "access");
			res.status(200).json({
				status: "success",
				message: "Token refreshed successfully",
				access_token,
			});
			return;
		}
	} catch (err) {
		next(new ForbiddenError("Unauthorized"));
		return;
	}
	next(new ForbiddenError("User not found"));
	return;
}

export async function updateUserById(req: CustomRequest, res: Response, next: NextFunction) {
	const user_id = req.params.id;
	if (req.user?.id !== user_id) {
		next(new ForbiddenError("Unauthorized"));
		return;
	}
	const user_to_update = req.body;
	const user = await getUserById(user_id);
	if (user) {
		const updated_user = await updateUser(user_id, user_to_update);
		res.status(200).json({
			status: "success",
			message: "User updated successfully",
			updated_user,
		});
		return;
	}
	next(new ForbiddenError("User not found"));
	return;
}

export async function deleteUserById(req: CustomRequest, res: Response, next: NextFunction) {
	const user_id = req.params.id;
	if (req.user?.id !== user_id) {
		next(new ForbiddenError("Unauthorized"));
		return;
	}
	const user = await getUserById(user_id);
	if (user) {
		const deleted_user = await deleteUser(user_id);
		res.status(200).json({
			status: "success",
			message: "User deleted successfully",
			deleted_user,
		});
		return;
	}
	next(new ForbiddenError("User not found"));
	return;
}

export async function getMe(req: CustomRequest, res: Response, next: NextFunction) {
	const current_user = req.user;
	if (current_user) delete current_user.passwordHash;
	res.status(200).json({
		status: "success",
		message: "User fetched successfully",
		user: req.user,
	});
	return;
}
