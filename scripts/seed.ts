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
      { id: 1, title: "Spanish", imageSrc: "/es.svg", },
      { id: 2, title: "Italian", imageSrc: "/it.svg", },
      { id: 3, title: "French", imageSrc: "/fr.svg", },
      { id: 4, title: "Croatian", imageSrc: "/hr.svg", },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1, // Spanish
        courseId: 1,
        title: "Unit 1",
        description: "Learn Spanish",
        order: 1,
      },
      {
        id: 2, // italian
        courseId: 2,
        title: "Unit 2",
        description: "Learn italian",
        order: 2,
      },
      {
        id: 3, // French
        courseId: 3,
        title: "Unit 3",
        description: "Learn French",
        order: 3,
      },
      {
        id: 4, // Croatian
        courseId: 4,
        title: "Unit 4",
        description: "Learn Croatian",
        order: 4,
      },
    ]);

    // todo? Unit > lessons
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, 
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1, 
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitId: 1, 
        order: 4,
        title: "Verbs",
      },
      {
        id: 5,
        unitId: 1, 
        order: 5,
        title: "Verbs",
      },
      {
        id: 6,
        unitId: 2, // Unit 2
        order: 1,
        title: "Nouns",
      },
      {
        id: 7,
        unitId: 2, 
        order: 2,
        title: "Verbs",
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

    // TODO: unit 1 > lesson 1 opt
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

    // TODO: unit 1 > lesson 2 opt
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
    // TODO: unit 1 > lesson 3 opt
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
