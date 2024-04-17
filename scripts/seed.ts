import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
//初始化資料庫 ; npm i -D tsx
const sql = neon(process.env.DATABASE_URL!); 
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      { id: 1, title: "英語", imageSrc: "/us.svg", },
      { id: 2, title: "日語", imageSrc: "/jp.svg", },
      { id: 3, title: "韓語", imageSrc: "/kr.svg", },
      { id: 4, title: "西班牙語", imageSrc: "/es.svg", },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "第 1 階段",
        description: "生活日常",
        order: 1,
      },
      {
        id: 2, 
        courseId: 1,
        title: "第 2 階段",
        description: "餐廳點餐",
        order: 2,
      },
      {
        id: 3,
        courseId: 2,
        title: "日語 第 1 階段",
        description: "打招呼",
        order: 1,
      },
      {
        id: 4,
        courseId: 3,
        title: "韓語 第 1 階段",
        description: "打招呼",
        order: 1,
      },
    ]);

    // todo? Unit > lessons
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // course1 > Unit 1 
        order: 1,
        title: "打招呼",
      },
      {
        id: 2,
        unitId: 1, 
        order: 2,
        title: "討論日常活動",
      },
      {
        id: 3,
        unitId: 1, 
        order: 3,
        title: "聊天",
      },
      {
        id: 4,
        unitId: 1, 
        order: 4,
        title: "建立中...",
      },
      {
        id: 5,
        unitId: 1, 
        order: 5,
        title: "建立中...",
      },
      {
        id: 6,
        unitId: 2, // course1 > Unit 2 
        order: 1,
        title: "喜歡的東西",
      },
      {
        id: 7,
        unitId: 2, 
        order: 2,
        title: "喜歡做什麼",
      },
      {
        id: 8,
        unitId: 3, // course1 > Unit 3 
        order: 1,
        title: "餐廳點餐(us)",
      },
      {
        id: 9,
        unitId: 3,
        order: 2,
        title: "點餐",
      },
      {
        id: 10,
        unitId: 4, // course2
        order: 1,
        title: "用日語打招呼",
      },
      {
        id: 11,
        unitId: 4, 
        order: 2,
        title: "餐廳點餐(jp)",
      },
      {
        id: 12,
        unitId: 5, // course3
        order: 1,
        title: "用韓語打招呼",
      },
      {
        id: 13,
        unitId: 5,
        order: 2,
        title: "餐廳點餐(kr)",
      },
    ]);

    // todo? unit 1 > lesson questions
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // lesson 1
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"? (lesson 1)',
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: '"the man" (lesson 1)',
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the robot"? (lesson 1)',
      },
      {
        id: 4,
        lessonId: 2, // lesson 2
        type: "SELECT",
        order:1,
        question: 'Which "the girl" ? (lesson 2)',
      },
      {
        id: 5,
        lessonId: 2, 
        type: "SELECT",
        order: 2,
        question: 'the women ? (lesson 2)',
      },
      {
        id: 6,
        lessonId: 3, // lesson 3
        type: "SELECT",
        order:1,
        question: '正確"選擇1" (lesson 3)',
      },
      {
        id: 7,
        lessonId: 3, 
        type: "SELECT",
        order: 2,
        question: '正確"選擇3" (lesson 3)',
      },
    ]);

    // todo*: unit 1 > lesson 1 opt
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Which one of these is "the man"?
        imageSrc: "/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 2, // "the man"?
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 3, // Which one of these is the "the robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);
    // todo*: unit 1 > lesson 2 opt
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4, // lesson 2 q1 Which one of these is "the girl"?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 4,
        imageSrc: "/woman.svg",
        correct: true,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 4,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 5,  //lesson 2 q2 'the girl' ?
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 5,
        imageSrc: "/woman.svg",
        correct: true,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 5,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);
    // todo*: unit 1 > lesson 3 opt
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 6, // lesson 3
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 7,  //lesson 3 q2
        correct: false, 
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 7,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 7,
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);
    

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
