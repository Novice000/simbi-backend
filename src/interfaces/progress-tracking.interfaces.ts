import { User } from "./user.interfaces";

export interface ProgressTracking {
	id: string;
	userId: string;
	date: Date;
	studyMinutes: number;
	completedSessions: number;
	missedSessions: number;
	currentStreak: number;
	simbiState: string;
	motivationLevel: number;
	lastInteraction?: Date ;

	// Relations
	user?: User;
}

export interface CreateProgressTrackingInput {
	userId: string;
	date: Date;
	studyMinutes?: number;
	completedSessions?: number;
	missedSessions?: number;
	currentStreak?: number;
	simbiState?: string;
	motivationLevel?: number;
	lastInteraction?: Date | null;
}

export interface UpdateProgressTrackingInput {
	studyMinutes?: number;
	completedSessions?: number;
	missedSessions?: number;
	currentStreak?: number;
	simbiState?: string;
	motivationLevel?: number;
	lastInteraction?: Date ;
}
