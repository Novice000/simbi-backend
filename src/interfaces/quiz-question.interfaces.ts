import { QuestionType } from "./enums";
import { Subject } from "./subject.interfaces";
import { QuizAttemptQuestion } from "./quiz-attempt-question.interfaces";

export interface MultipleChoiceOptions {
	choices: string[];
}

export interface TrueFalseOptions {
	statement: string;
}

export type QuizQuestionOptions = MultipleChoiceOptions | TrueFalseOptions | null;

export interface QuizQuestion {
	id: string;
	subjectId: string;
	userId?: string;
	questionText: string;
	questionType: QuestionType;
	difficulty: number;
	options?: QuizQuestionOptions;
	correctAnswer: string;
	explanation?: string | null;
	createdAt: Date;
	aiGenerated: boolean;

	// Relations
	subject?: Subject;
	quizAttemptQuestions?: QuizAttemptQuestion[];
}

export interface CreateQuizQuestionInput {
	subjectId: string;
	userId?: string ;
	questionText: string;
	questionType: QuestionType;
	difficulty?: number;
	options?: QuizQuestionOptions;
	correctAnswer: string;
	explanation?: string ;
	aiGenerated?: boolean;
}

export interface UpdateQuizQuestionInput {
	questionText?: string;
	questionType?: QuestionType;
	difficulty?: number;
	options?: QuizQuestionOptions;
	correctAnswer?: string;
	explanation?: string | null;
}
