import { QuizAttempt } from "./quiz-attempt.interfaces";
import { QuizQuestion } from "./quiz-question.interfaces";

export interface QuizAttemptQuestion {
	id: string;
	quizAttemptId: string;
	questionId: string;
	userAnswer?: string ;
	isCorrect?: boolean ;

	// Relations
	quizAttempt?: QuizAttempt;
	question?: QuizQuestion;
}

export interface CreateQuizAttemptQuestionInput {
	quizAttemptId: string;
	questionId: string;
	userAnswer?: string ;
	isCorrect?: boolean ;
}

export interface UpdateQuizAttemptQuestionInput {
	userAnswer?: string ;
	isCorrect?: boolean ;
}
