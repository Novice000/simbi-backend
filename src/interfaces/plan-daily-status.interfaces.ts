import { DailyStatus } from "./enums";
import { StudyPlan } from "./study-plan.interfaces";

export interface PlanDailyStatus {
	id: string;
	planId: string;
	date: Date;
	totalMinutesStudied: number;
	targetAchieved: boolean;
	status: DailyStatus;

	// Relations
	plan?: StudyPlan;
}

export interface CreatePlanDailyStatusInput {
	planId: string;
	date: Date;
	totalMinutesStudied?: number;
	targetAchieved?: boolean;
	status: DailyStatus;
	simbiReaction?: string;
}

export interface UpdatePlanDailyStatusInput {
	totalMinutesStudied?: number;
	targetAchieved?: boolean;
	status?: DailyStatus;
	simbiReaction?: string;
}
