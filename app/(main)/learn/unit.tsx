import { lessons, units } from "@/db/schema"

import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";
import Image from "next/image";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  } | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  const allLessonsCompleted = lessons.every(lesson => lesson.completed);

  return (
    <>
      <UnitBanner title={title} description={description} />

      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        {allLessonsCompleted ? (
          <Image 
            src="/finish_champ.svg" 
            alt="finish_lesson" 
            width={100} 
            height={100} 
          />
        ) : (
          <div className="mb-14">
            <Image 
              src="/finish_champ_icon.svg" 
              alt="finish_lesson" 
              width={70} 
              height={70} 
            />
          </div>
        )}
      </div>
    </>
  );
};