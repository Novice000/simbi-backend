import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { BadRequestError } from "../utils/errorClasses";

export function loginValidator(req: Request, res: Response, next: NextFunction): void {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			"string.email": "Please provide a valid email address",
			"any.required": "Email is required",
		}),
		password: Joi.string().required().messages({
			"any.required": "Password is required",
		}),
	});
	const { error } = schema.validate(req.body);
	if (error) {
		res.status(400).json({
			message: "Validation error",
			details: error.details.map((d) => d.message),
		});
		return;
	}
	next();
}

export function signUpValidator(req: Request, res: Response, next: NextFunction): void {
	const createUserSchema = Joi.object({
		username: Joi.string().min(3).max(30).alphanum().required().messages({
			"string.min": "Username is required and must be between 3-30 alphanumeric characters",
			"string.max": "Username is required and must be between 3-30 alphanumeric characters",
			"string.alphanum":
				"Username is required and must be between 3-30 alphanumeric characters",
			"any.required": "Username is required and must be between 3-30 alphanumeric characters",
		}),
		email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
			"string.email": "A valid email address is required",
			"any.required": "A valid email address is required",
		}),
		password: Joi.string().min(6).required().messages({
			"string.min": "Password is required and must be at least 6 characters",
			"any.required": "Password is required and must be at least 6 characters",
		}),
		firstName: Joi.string().trim().max(50).messages({
			"string.max": "First name must not exceed 50 characters",
		}),
		lastName: Joi.string().trim().max(50).messages({
			"string.max": "Last name must not exceed 50 characters",
		}),
		educationLevel: Joi.string()
			.valid(
				"elementary",
				"middle_school",
				"high_school",
				"undergraduate",
				"graduate",
				"doctorate",
				"other"
			)
			.messages({
				"any.only": "Education level must be a valid option",
			}),
		timezone: Joi.string()
			.pattern(/^[A-Za-z]+\/[A-Za-z_]+$/)
			.default("UTC")
			.messages({
				"string.pattern.base":
					"Timezone must be in the format Region/City (e.g., America/New_York)",
			}),
		preferredStudyMethod: Joi.string()
			.valid("pomodoro", "spaced_repetition", "feynman", "active_recall", "other")
			.messages({
				"any.only": "Preferred study method must be a valid option",
			}),
	});
	const { error } = createUserSchema.validate(req.body);
	if (error) {
		next(new BadRequestError(error.message));
		return;
	}
	next();
}

export function updateValidator(req: Request, res: Response, next: NextFunction): void {
	const updateUserSchema = Joi.object({
		username: Joi.string().min(3).max(30).alphanum().messages({
			"string.min": "Username must be between 3-30 alphanumeric characters",
			"string.max": "Username must be between 3-30 alphanumeric characters",
			"string.alphanum": "Username must be between 3-30 alphanumeric characters",
		}),
		email: Joi.string().email({ minDomainSegments: 2 }).messages({
			"string.email": "Please enter a valid email address",
		}),
		passwordHash: Joi.string().min(6).messages({
			"string.min": "Password must be at least 6 characters",
		}),
		firstName: Joi.string().trim().max(50).messages({
			"string.max": "First name must not exceed 50 characters",
		}),
		lastName: Joi.string().trim().max(50).messages({
			"string.max": "Last name must not exceed 50 characters",
		}),
		educationLevel: Joi.string()
			.valid(
				"elementary",
				"middle_school",
				"high_school",
				"undergraduate",
				"graduate",
				"doctorate",
				"other"
			)
			.messages({
				"any.only": "Education level must be a valid option",
			}),
		timezone: Joi.string()
			.pattern(/^[A-Za-z]+\/[A-Za-z_]+$/)
			.messages({
				"string.pattern.base":
					"Timezone must be in the format Region/City (e.g., America/New_York)",
			}),
		preferredStudyMethod: Joi.string()
			.valid("pomodoro", "spaced_repetition", "feynman", "active_recall", "other")
			.messages({
				"any.only": "Preferred study method must be a valid option",
			}),
		lastLogin: Joi.date().iso().messages({
			"date.base": "Last login must be a valid ISO date",
			"date.format": "Last login must be a valid ISO date",
		}),
	});

	const { error } = updateUserSchema.validate(req.body);
	if (error) {
		next(new BadRequestError(error.message));
	}
	next();
}

export async function refreshValidator(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const refreshSchema = Joi.object({
		refreshToken: Joi.string().required().messages({
			"any.required": "Refresh token is required",
		}),
	});
	const { error } = refreshSchema.validate(req.body);
	if (error) {
		next(new BadRequestError(error.message));
		return;
	}
	next();
}
