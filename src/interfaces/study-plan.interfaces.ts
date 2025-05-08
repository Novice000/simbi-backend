import { PlanStatus } from "./enums";
import { User } from "./user.interfaces";
import { Subject } from "./subject.interfaces";
import { StudySession } from "./study-session.interfaces";
import { PlanDailyStatus } from "./plan-daily-status.interfaces";
import { Milestone } from "./milestone.interfaces";

export interface StudyPlan {
	id: string;
	userId: string;
	subjectId: string;
	planName: string;
	dailyTargetMinutes: number;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	lastUpdated: Date;
	status: PlanStatus;

	// Relations
	user?: User;
	subject?: Subject;
	studySessions?: StudySession[];
	planDailyStatus?: PlanDailyStatus[];
	milestones?: Milestone[];
}

export interface CreateStudyPlanInput {
	userId: string;
	subjectId: string;
	planName: string;
	dailyTargetMinutes: number;
	startDate: Date;
	endDate: Date;
	status?: PlanStatus;
}

export interface UpdateStudyPlanInput {
	planName?: string;
	dailyTargetMinutes?: number;
	startDate?: Date;
	endDate?: Date;
	status?: PlanStatus;
}
