/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "DailyStatus" AS ENUM ('COMPLETED', 'PARTIAL', 'MISSED');

-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'MISSED');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "educationLevel" TEXT,
    "timezone" TEXT DEFAULT 'UTC',
    "preferredStudyMethod" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "educationYear" INTEGER,
    "colorCode" TEXT NOT NULL DEFAULT '#3498db',
    "difficultyLevel" INTEGER NOT NULL DEFAULT 3,
    "priority" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_plans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "planName" TEXT NOT NULL,
    "dailyTargetMinutes" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PlanStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "study_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_sessions" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionDate" DATE NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "notes" TEXT,
    "productivityRating" INTEGER,
    "simbiReaction" TEXT NOT NULL DEFAULT 'neutral',

    CONSTRAINT "study_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_daily_status" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "totalMinutesStudied" INTEGER NOT NULL DEFAULT 0,
    "targetAchieved" BOOLEAN NOT NULL DEFAULT false,
    "status" "DailyStatus" NOT NULL,

    CONSTRAINT "plan_daily_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestones" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" DATE,
    "completionCriteria" TEXT,
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "userId" TEXT,
    "questionText" TEXT NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 3,
    "options" JSONB,
    "correctAnswer" TEXT NOT NULL,
    "explanation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "totalQuestions" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "scorePercentage" DECIMAL(5,2) NOT NULL DEFAULT 0,

    CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempt_questions" (
    "id" TEXT NOT NULL,
    "quizAttemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userAnswer" TEXT,
    "isCorrect" BOOLEAN,

    CONSTRAINT "quiz_attempt_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress_tracking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "studyMinutes" INTEGER NOT NULL DEFAULT 0,
    "completedSessions" INTEGER NOT NULL DEFAULT 0,
    "missedSessions" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "simbiState" TEXT NOT NULL DEFAULT 'neutral',
    "motivationLevel" INTEGER NOT NULL DEFAULT 3,
    "lastInteraction" TIMESTAMP(3),

    CONSTRAINT "progress_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "subjects_userId_idx" ON "subjects"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_userId_name_key" ON "subjects"("userId", "name");

-- CreateIndex
CREATE INDEX "study_plans_userId_idx" ON "study_plans"("userId");

-- CreateIndex
CREATE INDEX "study_plans_subjectId_idx" ON "study_plans"("subjectId");

-- CreateIndex
CREATE INDEX "study_sessions_planId_idx" ON "study_sessions"("planId");

-- CreateIndex
CREATE INDEX "study_sessions_userId_idx" ON "study_sessions"("userId");

-- CreateIndex
CREATE INDEX "study_sessions_sessionDate_idx" ON "study_sessions"("sessionDate");

-- CreateIndex
CREATE INDEX "plan_daily_status_planId_idx" ON "plan_daily_status"("planId");

-- CreateIndex
CREATE INDEX "plan_daily_status_date_idx" ON "plan_daily_status"("date");

-- CreateIndex
CREATE UNIQUE INDEX "plan_daily_status_planId_date_key" ON "plan_daily_status"("planId", "date");

-- CreateIndex
CREATE INDEX "milestones_userId_idx" ON "milestones"("userId");

-- CreateIndex
CREATE INDEX "milestones_planId_idx" ON "milestones"("planId");

-- CreateIndex
CREATE INDEX "quiz_questions_subjectId_idx" ON "quiz_questions"("subjectId");

-- CreateIndex
CREATE INDEX "quiz_attempts_userId_idx" ON "quiz_attempts"("userId");

-- CreateIndex
CREATE INDEX "quiz_attempts_subjectId_idx" ON "quiz_attempts"("subjectId");

-- CreateIndex
CREATE INDEX "quiz_attempt_questions_quizAttemptId_idx" ON "quiz_attempt_questions"("quizAttemptId");

-- CreateIndex
CREATE INDEX "quiz_attempt_questions_questionId_idx" ON "quiz_attempt_questions"("questionId");

-- CreateIndex
CREATE INDEX "progress_tracking_userId_idx" ON "progress_tracking"("userId");

-- CreateIndex
CREATE INDEX "progress_tracking_date_idx" ON "progress_tracking"("date");

-- CreateIndex
CREATE UNIQUE INDEX "progress_tracking_userId_date_key" ON "progress_tracking"("userId", "date");

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_plans" ADD CONSTRAINT "study_plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_plans" ADD CONSTRAINT "study_plans_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_sessions" ADD CONSTRAINT "study_sessions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "study_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_sessions" ADD CONSTRAINT "study_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_daily_status" ADD CONSTRAINT "plan_daily_status_planId_fkey" FOREIGN KEY ("planId") REFERENCES "study_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_planId_fkey" FOREIGN KEY ("planId") REFERENCES "study_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempt_questions" ADD CONSTRAINT "quiz_attempt_questions_quizAttemptId_fkey" FOREIGN KEY ("quizAttemptId") REFERENCES "quiz_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempt_questions" ADD CONSTRAINT "quiz_attempt_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "quiz_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_tracking" ADD CONSTRAINT "progress_tracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
