import { Subject } from "./subject.interfaces";
import { StudyPlan } from "./study-plan.interfaces";
import { StudySession } from "./study-session.interfaces";
import { Milestone } from "./milestone.interfaces";
import { QuizAttempt } from "./quiz-attempt.interfaces";
import { ProgressTracking } from "./progress-tracking.interfaces";

export interface User {
	id: string;
	username: string;
	email: string;
	passwordHash: string;
	firstName?: string ;
	lastName?: string ;
	educationLevel?: string ;
	timezone: string;
	preferredStudyMethod?: string ;
	createdAt: Date;
	lastLogin?: Date ;

	// Relations
	subjects?: Subject[];
	studyPlans?: StudyPlan[];
	studySessions?: StudySession[];
	milestones?: Milestone[];
	quizAttempts?: QuizAttempt[];
	progressTracking?: ProgressTracking[];
}

export interface CreateUserInput {
	username: string;
	email: string;
	passwordHash: string;
	firstName: string;
	lastName: string;
	educationLevel?: string;
	timezone?: string;
	preferredStudyMethod?: string;
}

export interface UpdateUserInput {
	username?: string;
	email?: string;
	passwordHash?: string;
	firstName?: string ;
	lastName?: string ;
	educationLevel?: string ;
	timezone?: string;
	preferredStudyMethod?: string ;
	lastLogin?: Date ;
}
