import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const members = sqliteTable("members", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: integer("phone").notNull(),
    year: integer("year").notNull(),
    major: text("major").notNull(),
});

export const memberSocials = sqliteTable("member_socials", {
    memberId: integer("member_id")
        .references(() => members.id)
        .primaryKey(),
    portfolio: text("portfolio"),
    instagram: text("instagram"),
    linkedin: text("linkedin"),
});

export const memberEssays = sqliteTable("member_essays", {
    memberId: integer("member_id")
        .references(() => members.id)
        .primaryKey(),
    convince: text("convince"),
    project: text("project"),
    reasons: text("reasons"),
});

export const memberAnalytics = sqliteTable("member_analytics", {
    memberId: integer("member_id")
        .references(() => members.id)
        .primaryKey(),
    howhear: text("howhear"),
    intent: text("intent"),
});
