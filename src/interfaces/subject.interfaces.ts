import { User } from "./user.interfaces";
import { StudyPlan } from "./study-plan.interfaces";
import { QuizQuestion } from "./quiz-question.interfaces";

export interface Subject {
	id: string;
	userId: string;
	name: string;
	educationLevel: string;
	educationYear?: number | null;
	colorCode: string;
	difficultyLevel: number;
	priority: number;
	createdAt: Date;

	// Relations
	user?: User;
	studyPlans?: StudyPlan[];
	quizQuestions?: QuizQuestion[];
}

export interface CreateSubjectInput {
	userId: string;
	name: string;
	educationLevel: string;
	educationYear?: number | null;
	colorCode?: string;
	difficultyLevel?: number;
	priority?: number;
}

export interface UpdateSubjectInput {
	name?: string;
	educationLevel?: string;
	educationYear?: number | null;
	colorCode?: string;
	difficultyLevel?: number;
	priority?: number;
}
