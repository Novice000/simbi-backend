import { User } from "./user.interfaces";
import { QuizAttemptQuestion } from "./quiz-attempt-question.interfaces";

export interface QuizAttempt {
	id: string;
	userId: string;
	subjectId: string;
	startTime: Date;
	endTime?: Date | null;
	totalQuestions: number;
	correctAnswers: number;
	scorePercentage: number; // Decimal in DB, but typically handled as number in TS

	// Relations
	user?: User;
	quizAttemptQuestions?: QuizAttemptQuestion[];
}

export interface CreateQuizAttemptInput {
	userId: string;
	subjectId: string;
	totalQuestions: number;
}

export interface UpdateQuizAttemptInput {
	endTime?: Date | null;
	correctAnswers?: number;
	scorePercentage?: number;
}
