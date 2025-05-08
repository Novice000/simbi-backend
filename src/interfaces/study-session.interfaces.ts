import { StudyPlan } from "./study-plan.interfaces";
import { User } from "./user.interfaces";

export interface StudySession {
	id: string;
	planId: string;
	userId: string;
	sessionDate: Date;
	startTime: Date;
	endTime: Date;
	durationMinutes: number;
	notes?: string | null;
	productivityRating?: number;
	simbiReaction?: string;

	// Relations
	plan?: StudyPlan;
	user?: User;
}

export interface CreateStudySessionInput {
	planId: string;
	userId: string;
	sessionDate: Date;
	startTime: Date;
	endTime: Date;
	durationMinutes: number;
	notes?: string | null;
	productivityRating?: number ;
}

export interface UpdateStudySessionInput {
	sessionDate?: Date;
	startTime?: Date;
	endTime?: Date;
	durationMinutes?: number;
	notes?: string | null;
	productivityRating?: number;
	simbiReaction?: string;
}
