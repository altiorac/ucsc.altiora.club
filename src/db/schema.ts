import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const applications = sqliteTable("applications", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull().unique(),
    phone: text("phone").notNull().unique(),
    year: text("year"),
    major: text("major"),
    divisions: text("divisions", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
    instagram: text("instagram"),
    linkedin: text("linkedin"),
    portfolio: text("portfolio"),
    howHear: text("how_hear"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(strftime('%s', 'now') * 1000)`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(strftime('%s', 'now') * 1000)`),
});

export const applicationEssays = sqliteTable("application_essays", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    applicationId: integer("application_id")
        .notNull()
        .references(() => applications.id, { onDelete: "cascade" }),
    convince: text("convince").notNull(),
    project: text("project").notNull(),
    reasons: text("reasons"),
    intent: text("intent"),
});

export const applicationsRelations = relations(applications, ({ one }) => ({
    essays: one(applicationEssays, {
        fields: [applications.id],
        references: [applicationEssays.applicationId],
    }),
}));

export const applicationEssaysRelations = relations(applicationEssays, ({ one }) => ({
    application: one(applications, {
        fields: [applicationEssays.applicationId],
        references: [applications.id],
    }),
}));
