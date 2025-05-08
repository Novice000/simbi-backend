// milestone.interfaces.ts
import { MilestoneStatus } from "./enums";
import { User } from "./user.interfaces";
import { StudyPlan } from "./study-plan.interfaces";

export interface Milestone {
	id: string;
	userId: string;
	planId?: string | null;
	title: string;
	description?: string | null;
	dueDate?: Date | null;
	completionCriteria?: string | null;
	status: MilestoneStatus;
	createdAt: Date;
	completedAt?: Date | null;

	// Relations
	user?: User;
	plan?: StudyPlan | null;
}

export interface CreateMilestoneInput {
	userId: string;
	planId?: string | null;
	title: string;
	description?: string | null;
	dueDate?: Date | null;
	completionCriteria?: string | null;
	status?: MilestoneStatus;
}

export interface UpdateMilestoneInput {
	title?: string;
	description?: string | null;
	dueDate?: Date | null;
	completionCriteria?: string | null;
	status?: MilestoneStatus;
	completedAt?: Date | null;
}
