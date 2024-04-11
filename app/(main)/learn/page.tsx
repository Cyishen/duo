import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { UserProgress } from "@/components/user-progress"
import { redirect } from "next/navigation"

import { Header } from "./header"
import { Unit } from "./unit"

import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries"
import { lessons, units as unitsSchema } from "@/db/schema"

const LearnPage = async () => {
  const userProgressData = getUserProgress()
  const unitData = getUnits()

  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const userSubscriptionData = getUserSubscription();

  const [ 
    userProgress, 
    units, 
    courseProgress, 
    lessonPercentage, 
    userSubscription, 
  ] = await Promise.all([
      userProgressData, 
      unitData, 
      courseProgressData, 
      lessonPercentageData, 
      userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {/* sticky on desktop */}
      <StickyWrapper>
        <UserProgress 
          activeCourse={userProgress.activeCourse} 
          hearts={userProgress.hearts} 
          points={userProgress.points} 
          hasActiveSubscription={false} 
        />
      </StickyWrapper>

      {/* Feed on mobile */}
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect;
              } | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage