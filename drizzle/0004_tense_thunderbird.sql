DROP INDEX "applications_email_unique";--> statement-breakpoint
DROP INDEX "applications_phone_unique";--> statement-breakpoint
DROP INDEX "applications_instagram_unique";--> statement-breakpoint
DROP INDEX "applications_linkedin_unique";--> statement-breakpoint
ALTER TABLE `applications` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT '"2025-10-10T00:49:28.543Z"';--> statement-breakpoint
CREATE UNIQUE INDEX `applications_email_unique` ON `applications` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `applications_phone_unique` ON `applications` (`phone`);--> statement-breakpoint
CREATE UNIQUE INDEX `applications_instagram_unique` ON `applications` (`instagram`);--> statement-breakpoint
CREATE UNIQUE INDEX `applications_linkedin_unique` ON `applications` (`linkedin`);