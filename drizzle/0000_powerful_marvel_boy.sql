CREATE TABLE `application_essays` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`application_id` integer NOT NULL,
	`convince` text NOT NULL,
	`project` text NOT NULL,
	`reasons` text,
	`intent` text,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`year` text,
	`major` text,
	`instagram` text,
	`linkedin` text,
	`portfolio` text,
	`how_hear` text,
	`created_at` integer DEFAULT '"2025-10-02T19:49:38.790Z"' NOT NULL
);
