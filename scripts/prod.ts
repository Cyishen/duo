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
      db.delete(schema.userSubscription),
      // db.delete(schema.userProgress),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "英語", imageSrc: "/us.svg" },
        { title: "日語", imageSrc: "/jp.svg", },
        { title: "韓語", imageSrc: "/kr.svg", },
        // { title: "西班牙語", imageSrc: "/es.svg" },
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
                      question: 'Which one is student?',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "VOICE",
                      question: 'Can you _ Duo?',
                      order: 2,
                      audioSrc: "/source/us/unit_1/can_you_find_duo.mp3",
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: 'Hey, How is it going?',
                      order: 3,
                    },
                    {
                      lessonId: lesson.id,
                      type: "VOICE",
                      question: '哪個是男人？',
                      order: 4,
                      imageSrc:"/man.svg"
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '早安',
                      order: 5,
                    },
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "@#$^()~!",
                        imageSrc: "/source/us/unit_1/baby.svg",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "I am ...",
                        imageSrc: "/source/us/unit_1/student.svg"
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "I am ...",
                        imageSrc: "/source/us/unit_1/doctor.svg"
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "timed",
                        audioSrc: "/source/us/unit_1/timed.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "find",
                        audioSrc: "/source/us/unit_1/find.mp3",
                      },
                    ]);
                  } 

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "Hi, Not bad.",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "I am going to bed.",
                      },
                    ]);
                  }

                  if (challenge.order === 4) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "Man",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "Women",
                      },
                    ]);
                  }

                  if (challenge.order === 5) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                        audioSrc: "/source/us/unit_1/good_morning.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        audioSrc: "/source/us/unit_1/good_evening.mp3",
                      },
                    ]);
                  }
                }
              } //打招呼

              if (lesson.order === 2) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: 'He is _ man',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '在討論什麼? Yes, She is my Chinese teacher and he is my English teacher.',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '_ old house.',
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
                        text: "a",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "an",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "她的老師",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "餐廳食物",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "她的新家",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "a",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "an",
                      },
                    ]);
                  }
                }
              } //日常活動

              if (lesson.order === 3) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: 'Hello Tom! Welcome to my _ house',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: 'Do you like _ ?',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: 'That boy is my _ ',
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
                        text: "new",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "easy",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "now",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                        audioSrc: "/source/us/unit_1/pets.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        audioSrc: "/source/us/unit_1/pants.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "restaurant",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "brother",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "exam",
                      },
                    ]);
                  }
                }
              } //聊天
            }
          } //打招呼

          if (unit.order === 2) {
            const lessons = await db
              .insert(schema.lessons)
              .values([
                { unitId: unit.id, title: "到餐廳", order: 1 },
                { unitId: unit.id, title: "點餐", order: 2 },
                { unitId: unit.id, title: "付款", order: 3 },
                { unitId: unit.id, title: "建立中...", order: 4 },
                { unitId: unit.id, title: "建立中...", order: 5 },
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
                      question: '哪個是餐廳?',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: 'Would you like a table ?',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: 'We need a __ table, please',
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
                        text: "restaurant",
                        imageSrc: "/source/us/unit_2/restaurant.svg",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "house",
                        imageSrc: "/source/us/unit_2/house.svg",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "skyscraper",
                        imageSrc: "/source/us/unit_2/skyscraper.svg",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                        audioSrc: "/source/us/unit_2/a_table_for_one.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        audioSrc: "/source/us/unit_2/we_need_four_shirts.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        audioSrc: "/source/us/unit_2/bad.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                        audioSrc: "/source/us/unit_2/big.mp3",
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
                      type: "ASSIST",
                      question: '哪個是牛奶?',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '填空 I would like two _ ?',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '填空 Two _ of coffee',
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
                        correct: false,
                        text: "water",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "menu",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "milk",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "pizzas",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "house",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "water",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "cup",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "bootle",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "cups",
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
                      type: "ASSIST",
                      question: '結帳, 謝謝',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '說話的人表示什麼, I like this new restaurant! This chicken sandwich is good.',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '填空, _ like a pizza. _ like a pizza, Ben?',
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
                        text: "Check, please",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "Thank you, goodbye",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "I want to order",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "不喜歡這個餐廳",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "不喜歡雞肉三明治",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "喜歡這個餐廳",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "I am / Your are",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "You / I would",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "I would / Would you",
                      },
                    ]);
                  }
                }
              }
            }
          } //餐廳點餐
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
                { unitId: unit.id, title: "building", order: 4 },
                { unitId: unit.id, title: "building", order: 5 },
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
                      type: "ASSIST",
                      question: '早安, 你好',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "VOICE",
                      question: 'おやすみ、こんにちは',
                      audioSrc: "/source/jp/unit_1/good_evening_jp.mp3",
                      order: 2,
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
                        text: "",
                        audioSrc: "/source/jp/unit_1/good_morning_jp.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        audioSrc: "/source/jp/unit_1/good_evening_jp.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "早安, 你好",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "晚安, 你好",
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
                  ])
                  .returning();

                // For each challenge, insert challenge options
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
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
                        text: "",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
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
                { unitId: unit.id, title: "building", order: 4 },
                { unitId: unit.id, title: "building", order: 5 },
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
                        text: "",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
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
                        text: "",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
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
                        text: "",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
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
                { unitId: unit.id, title: "building", order: 4 },
                { unitId: unit.id, title: "building", order: 5 },
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
                      type: "ASSIST",
                      question: '早安, 你好',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "VOICE",
                      question: '안녕하세요',
                      audioSrc: "/source/kr/unit_1/good_morning_kr.mp3",
                      order: 2,
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
                        text: "",
                        audioSrc: "/source/kr/unit_1/good_morning_kr.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        audioSrc: "/source/kr/unit_1/good_evening_kr.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "早安",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "晚安",
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
                        text: "",
                        imageSrc: "",
                        audioSrc: "",
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
                        text: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
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
                { unitId: unit.id, title: "building", order: 4 },
                { unitId: unit.id, title: "building", order: 5 },
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
                        text: "",
                        imageSrc: "",
                        audioSrc: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        imageSrc: "",
                        audioSrc: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        imageSrc: "",
                        audioSrc: "",
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
                        text: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
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
                        text: "",
                        imageSrc: "",
                        audioSrc: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        imageSrc: "",
                        audioSrc: "",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "",
                        imageSrc: "",
                        audioSrc: "",
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
    // for (const course of courses) {
    //   if (course.title === "西班牙語") {
    //     const units = await db
    //       .insert(schema.units)
    //       .values([
    //         {
    //           courseId: course.id,
    //           title: "Unit 1",
    //           description: `Learn the basics of ${course.title}`,
    //           order: 1,
    //         },
    //         {
    //           courseId: course.id,
    //           title: "Unit 2",
    //           description: `Learn intermediate ${course.title}`,
    //           order: 2,
    //         },
    //       ])
    //       .returning();

    //     // For each unit, insert lessons
    //     for (const unit of units) {
    //       const lessons = await db
    //         .insert(schema.lessons)
    //         .values([
    //           { unitId: unit.id, title: "Nouns", order: 1 },
    //           { unitId: unit.id, title: "Verbs", order: 2 },
    //           { unitId: unit.id, title: "Adjectives", order: 3 },
    //           { unitId: unit.id, title: "Phrases", order: 4 },
    //           { unitId: unit.id, title: "Sentences", order: 5 },
    //         ])
    //         .returning();

    //       // For each lesson, insert challenges
    //       for (const lesson of lessons) {
    //         const challenges = await db
    //           .insert(schema.challenges)
    //           .values([
    //             {
    //               lessonId: lesson.id,
    //               type: "SELECT",
    //               question: 'Which one of these is "the man"?',
    //               order: 1,
    //             },
    //             {
    //               lessonId: lesson.id,
    //               type: "SELECT",
    //               question: 'Which one of these is "the woman"?',
    //               order: 2,
    //             },
    //             {
    //               lessonId: lesson.id,
    //               type: "SELECT",
    //               question: 'Which one of these is "the boy"?',
    //               order: 3,
    //             },
    //             {
    //               lessonId: lesson.id,
    //               type: "ASSIST",
    //               question: '"the man"',
    //               order: 4,
    //             },
    //             {
    //               lessonId: lesson.id,
    //               type: "SELECT",
    //               question: 'Which one of these is "the zombie"?',
    //               order: 5,
    //             },
    //             {
    //               lessonId: lesson.id,
    //               type: "SELECT",
    //               question: 'Which one of these is "the robot"?',
    //               order: 6,
    //             },
    //             {
    //               lessonId: lesson.id,
    //               type: "SELECT",
    //               question: 'Which one of these is "the girl"?',
    //               order: 7,
    //             },
    //             {
    //               lessonId: lesson.id,
    //               type: "ASSIST",
    //               question: '"the zombie"',
    //               order: 8,
    //             },
    //           ])
    //           .returning();

    //         // For each challenge, insert challenge options
    //         for (const challenge of challenges) {
    //           if (challenge.order === 1) {
    //             await db.insert(schema.challengeOptions).values([
    //               {
    //                 challengeId: challenge.id,
    //                 correct: true,
    //                 text: "el hombre",
    //                 imageSrc: "/man.svg",
    //                 audioSrc: "/es_man.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "la mujer",
    //                 imageSrc: "/woman.svg",
    //                 audioSrc: "/es_woman.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el chico",
    //                 imageSrc: "/boy.svg",
    //                 audioSrc: "/es_boy.mp3",
    //               },
    //             ]);
    //           }

    //           if (challenge.order === 2) {
    //             await db.insert(schema.challengeOptions).values([
    //               {
    //                 challengeId: challenge.id,
    //                 correct: true,
    //                 text: "la mujer",
    //                 imageSrc: "/woman.svg",
    //                 audioSrc: "/es_woman.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el chico",
    //                 imageSrc: "/boy.svg",
    //                 audioSrc: "/es_boy.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el hombre",
    //                 imageSrc: "/man.svg",
    //                 audioSrc: "/es_man.mp3",
    //               },
    //             ]);
    //           }

    //           if (challenge.order === 3) {
    //             await db.insert(schema.challengeOptions).values([
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "la mujer",
    //                 imageSrc: "/woman.svg",
    //                 audioSrc: "/es_woman.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el hombre",
    //                 imageSrc: "/man.svg",
    //                 audioSrc: "/es_man.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: true,
    //                 text: "el chico",
    //                 imageSrc: "/boy.svg",
    //                 audioSrc: "/es_boy.mp3",
    //               },
    //             ]);
    //           }

    //           if (challenge.order === 4) {
    //             await db.insert(schema.challengeOptions).values([
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "la mujer",
    //                 audioSrc: "/es_woman.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: true,
    //                 text: "el hombre",
    //                 audioSrc: "/es_man.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el chico",
    //                 audioSrc: "/es_boy.mp3",
    //               },
    //             ]);
    //           }

    //           if (challenge.order === 5) {
    //             await db.insert(schema.challengeOptions).values([
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el hombre",
    //                 imageSrc: "/man.svg",
    //                 audioSrc: "/es_man.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "la mujer",
    //                 imageSrc: "/woman.svg",
    //                 audioSrc: "/es_woman.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: true,
    //                 text: "el zombie",
    //                 imageSrc: "/zombie.svg",
    //                 audioSrc: "/es_zombie.mp3",
    //               },
    //             ]);
    //           }

    //           if (challenge.order === 6) {
    //             await db.insert(schema.challengeOptions).values([
    //               {
    //                 challengeId: challenge.id,
    //                 correct: true,
    //                 text: "el robot",
    //                 imageSrc: "/robot.svg",
    //                 audioSrc: "/es_robot.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el zombie",
    //                 imageSrc: "/zombie.svg",
    //                 audioSrc: "/es_zombie.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el chico",
    //                 imageSrc: "/boy.svg",
    //                 audioSrc: "/es_boy.mp3",
    //               },
    //             ]);
    //           }

    //           if (challenge.order === 7) {
    //             await db.insert(schema.challengeOptions).values([
    //               {
    //                 challengeId: challenge.id,
    //                 correct: true,
    //                 text: "la nina",
    //                 imageSrc: "/girl.svg",
    //                 audioSrc: "/es_girl.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el zombie",
    //                 imageSrc: "/zombie.svg",
    //                 audioSrc: "/es_zombie.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el hombre",
    //                 imageSrc: "/man.svg",
    //                 audioSrc: "/es_man.mp3",
    //               },
    //             ]);
    //           }

    //           if (challenge.order === 8) {
    //             await db.insert(schema.challengeOptions).values([
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "la mujer",
    //                 audioSrc: "/es_woman.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: true,
    //                 text: "el zombie",
    //                 audioSrc: "/es_zombie.mp3",
    //               },
    //               {
    //                 challengeId: challenge.id,
    //                 correct: false,
    //                 text: "el chico",
    //                 audioSrc: "/es_boy.mp3",
    //               },
    //             ]);
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
