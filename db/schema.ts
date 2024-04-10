import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

//TODO: build Model, serial 資料型態，用於建立自動遞增的整數欄位
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});
//many 函式: 建立多對一的關係，一個課程可以對應到多個使用者進度記錄。
export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),  //一個課程對應到多個單元。
}));

//TODO: onDelete: "cascade"= when a course is delete, it is also delete
export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
});
//one 函式: 建立一對一的關係，即每個使用者進度記錄都對應到一個活躍的課程。
//fields與references屬性，表示將 `userProgress` 表格的 `activeCourseId` 欄位與 `courses` 表格的 `id`欄位連結。
export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));

//TODO: 
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), //ex: Unit 1
  description: text("description").notNull(), //ex: Learn the basics of spanish
  courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  order: integer("order").notNull(),
});
//one 函式: 表示一個單元 (unit) 對應到一個課程 (course)
//many 函式: 表示一個單元 (unit) 對應到很多課程 (lessons)
export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId], //`units` 表格的 `courseId` 欄位與 `courses` 表格的 `id` 欄位連結。
    references: [courses.id],
  }),
  lessons: many(lessons), 
}));

//TODO:
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(),
  order: integer("order").notNull(),
});
// one 函式: 表示一個課程 (lesson) 對應到一個單元 (unit)
// many 函式: 表示一個課程 (lesson) 對應到很多挑戰 (challenges)
export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId], // lessons 表格的 `unitId` 欄位與 units 表格的 `id` 欄位連結。
    references: [units.id],
  }),
  challenges: many(challenges),
}));

//TODO: pgEnum 列舉型 (enum)函式資料型態: 定義一個由一組固定值組成的集合， type 的列舉型，指定了兩個可能的值：SELECT 和 ASSIST。
export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});
// one 函式: 表示一個挑戰 (challenge) 對應到一個課程 (lesson)
// many 函式: 表示一個挑戰 (challenge) 對應到很多挑戰選項 (challengeOptions) 和挑戰進度 (challengeProgress)
export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId], // challenges 表格的 `lessonId` 欄位與 lessons 表格的 `id` 欄位連結。
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

//TODO:
export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeOptions.challengeId],
    references: [challenges.id],
  }),
}));

//TODO:
export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeProgress.challengeId],
    references: [challenges.id],
  }),
}));

// TODO:
export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});