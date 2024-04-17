import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.courses),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.challenges),
      db.delete(schema.challengeOptions),
      // db.delete(schema.userSubscription),
      // db.delete(schema.userProgress),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "英語", imageSrc: "/us.svg" },
        { title: "日語", imageSrc: "/jp.svg", },
        { title: "韓語", imageSrc: "/kr.svg", },
        { title: "西班牙語", imageSrc: "/es.svg" },
      ])
      .returning();

    // TODO: 英語
    for (const course of courses) {
      if (course.title === "英語") {
        const units = await db
          .insert(schema.units)
          .values([
            {
              courseId: course.id,
              title: "第 1 階段",
              description: `${course.title} 打招呼`,
              order: 1,
            },
            {
              courseId: course.id,
              title: "第 2 階段",
              description: `${course.title} 餐廳點餐`,
              order: 2,
            },
          ])
          .returning();

        // For each unit, insert lessons
        for (const unit of units) {
          if (unit.order === 1) {
            const lessons = await db
              .insert(schema.lessons)
              .values([
                { unitId: unit.id, title: "打招呼", order: 1 },
                { unitId: unit.id, title: "日常活動", order: 2 },
                { unitId: unit.id, title: "聊天", order: 3 },
              ])
              .returning();

            // For each lesson, insert challenges
            for (const lesson of lessons) {
              if (lesson.order === 1) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '打招呼1-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '打招呼1-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '打招呼1-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 2) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '日常活動2-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '日常活動2-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '日常活動2-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 3) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '聊天3-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '聊天3-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '聊天3-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
            }
          }

          if (unit.order === 2) {
            const lessons = await db
              .insert(schema.lessons)
              .values([
                { unitId: unit.id, title: "到餐廳", order: 1 },
                { unitId: unit.id, title: "點餐", order: 2 },
                { unitId: unit.id, title: "付款", order: 3 },
              ])
              .returning();

            // For each lesson, insert challenges
            for (const lesson of lessons) {
              if (lesson.order === 1) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '餐廳1-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '餐廳1-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '餐廳1-3',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 2) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '點餐2-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '點餐2-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '點餐2-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 3) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '付款3-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '付款3-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '付款3-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
            }
          }
        }
      }
    }

    // TODO: 日語
    for (const course of courses) {
      if (course.title === "日語") {
        const units = await db
          .insert(schema.units)
          .values([
            {
              courseId: course.id,
              title: "第 1 階段",
              description: `${course.title} 打招呼`,
              order: 1,
            },
            {
              courseId: course.id,
              title: "第 2 階段",
              description: `${course.title} 餐廳點餐`,
              order: 2,
            },
          ])
          .returning();

        // For each unit, insert lessons
        for (const unit of units) {
          if (unit.order === 1) {
            const lessons = await db
              .insert(schema.lessons)
              .values([
                { unitId: unit.id, title: "打招呼", order: 1 },
                { unitId: unit.id, title: "日常活動", order: 2 },
                { unitId: unit.id, title: "聊天", order: 3 },
              ])
              .returning();

            // For each lesson, insert challenges
            for (const lesson of lessons) {
              if (lesson.order === 1) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '打招呼1-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '打招呼1-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '打招呼1-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 2) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '日常活動2-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '日常活動2-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '日常活動2-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 3) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '聊天3-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '聊天3-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '聊天3-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
            }
          }

          if (unit.order === 2) {
            const lessons = await db
              .insert(schema.lessons)
              .values([
                { unitId: unit.id, title: "到餐廳", order: 1 },
                { unitId: unit.id, title: "點餐", order: 2 },
                { unitId: unit.id, title: "付款", order: 3 },
              ])
              .returning();

            // For each lesson, insert challenges
            for (const lesson of lessons) {
              if (lesson.order === 1) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '餐廳1-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '餐廳1-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '餐廳1-3',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 2) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '點餐2-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '點餐2-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '點餐2-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 3) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '付款3-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '付款3-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '付款3-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
            }
          }
        }
      }
    }

    // TODO: 韓語
    for (const course of courses) {
      if (course.title === "韓語") {
        const units = await db
          .insert(schema.units)
          .values([
            {
              courseId: course.id,
              title: "第 1 階段",
              description: `${course.title} 打招呼`,
              order: 1,
            },
            {
              courseId: course.id,
              title: "第 2 階段",
              description: `${course.title} 餐廳點餐`,
              order: 2,
            },
          ])
          .returning();

        // For each unit, insert lessons
        for (const unit of units) {
          if (unit.order === 1) {
            const lessons = await db
              .insert(schema.lessons)
              .values([
                { unitId: unit.id, title: "打招呼", order: 1 },
                { unitId: unit.id, title: "日常活動", order: 2 },
                { unitId: unit.id, title: "聊天", order: 3 },
              ])
              .returning();

            // For each lesson, insert challenges
            for (const lesson of lessons) {
              if (lesson.order === 1) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '打招呼1-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '打招呼1-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '打招呼1-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 2) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '日常活動2-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '日常活動2-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '日常活動2-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 3) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '聊天3-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '聊天3-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '聊天3-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
            }
          }

          if (unit.order === 2) {
            const lessons = await db
              .insert(schema.lessons)
              .values([
                { unitId: unit.id, title: "到餐廳", order: 1 },
                { unitId: unit.id, title: "點餐", order: 2 },
                { unitId: unit.id, title: "付款", order: 3 },
              ])
              .returning();

            // For each lesson, insert challenges
            for (const lesson of lessons) {
              if (lesson.order === 1) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '餐廳1-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '餐廳1-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '餐廳1-3',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 2) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '點餐2-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '點餐2-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '點餐2-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
              if (lesson.order === 3) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '付款3-1',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '付款3-2',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: '付款3-3?',
                      order: 3,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la mujer",
                        imageSrc: "/woman.svg",
                        audioSrc: "/es_woman.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "el hombre",
                        imageSrc: "/man.svg",
                        audioSrc: "/es_man.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "el chico",
                        imageSrc: "/boy.svg",
                        audioSrc: "/es_boy.mp3",
                      },
                    ]);
                  }
                }
              }
            }
          }
        }
      }
    }

    // TODO: 西班牙語
    for (const course of courses) {
      if (course.title === "西班牙語") {
        const units = await db
          .insert(schema.units)
          .values([
            {
              courseId: course.id,
              title: "Unit 1",
              description: `Learn the basics of ${course.title}`,
              order: 1,
            },
            {
              courseId: course.id,
              title: "Unit 2",
              description: `Learn intermediate ${course.title}`,
              order: 2,
            },
          ])
          .returning();

        // For each unit, insert lessons
        for (const unit of units) {
          const lessons = await db
            .insert(schema.lessons)
            .values([
              { unitId: unit.id, title: "Nouns", order: 1 },
              { unitId: unit.id, title: "Verbs", order: 2 },
              { unitId: unit.id, title: "Adjectives", order: 3 },
              { unitId: unit.id, title: "Phrases", order: 4 },
              { unitId: unit.id, title: "Sentences", order: 5 },
            ])
            .returning();

          // For each lesson, insert challenges
          for (const lesson of lessons) {
            const challenges = await db
              .insert(schema.challenges)
              .values([
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the man"?',
                  order: 1,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the woman"?',
                  order: 2,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the boy"?',
                  order: 3,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the man"',
                  order: 4,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the zombie"?',
                  order: 5,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the robot"?',
                  order: 6,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the girl"?',
                  order: 7,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the zombie"',
                  order: 8,
                },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el hombre",
                    imageSrc: "/man.svg",
                    audioSrc: "/es_man.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la mujer",
                    imageSrc: "/woman.svg",
                    audioSrc: "/es_woman.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el chico",
                    imageSrc: "/boy.svg",
                    audioSrc: "/es_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "la mujer",
                    imageSrc: "/woman.svg",
                    audioSrc: "/es_woman.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el chico",
                    imageSrc: "/boy.svg",
                    audioSrc: "/es_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el hombre",
                    imageSrc: "/man.svg",
                    audioSrc: "/es_man.mp3",
                  },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la mujer",
                    imageSrc: "/woman.svg",
                    audioSrc: "/es_woman.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el hombre",
                    imageSrc: "/man.svg",
                    audioSrc: "/es_man.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el chico",
                    imageSrc: "/boy.svg",
                    audioSrc: "/es_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la mujer",
                    audioSrc: "/es_woman.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el hombre",
                    audioSrc: "/es_man.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el chico",
                    audioSrc: "/es_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el hombre",
                    imageSrc: "/man.svg",
                    audioSrc: "/es_man.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la mujer",
                    imageSrc: "/woman.svg",
                    audioSrc: "/es_woman.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el zombie",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/es_zombie.mp3",
                  },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el robot",
                    imageSrc: "/robot.svg",
                    audioSrc: "/es_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el zombie",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/es_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el chico",
                    imageSrc: "/boy.svg",
                    audioSrc: "/es_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 7) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "la nina",
                    imageSrc: "/girl.svg",
                    audioSrc: "/es_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el zombie",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/es_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el hombre",
                    imageSrc: "/man.svg",
                    audioSrc: "/es_man.mp3",
                  },
                ]);
              }

              if (challenge.order === 8) {
                await db.insert(schema.challengeOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la mujer",
                    audioSrc: "/es_woman.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el zombie",
                    audioSrc: "/es_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el chico",
                    audioSrc: "/es_boy.mp3",
                  },
                ]);
              }
            }
          }
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
