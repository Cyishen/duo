import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { UserProgress } from "@/components/user-progress"
import { redirect } from "next/navigation"

import { Header } from "./header"
import { Unit } from "./unit"

import { getUnits, getUserProgress } from "@/db/queries"

const LearnPage = async () => {
  const userProgressData = getUserProgress()
  const unitData = getUnits()
  const [ userProgress, units ] = await Promise.all([ userProgressData, unitData ]);

  if (!userProgress || !userProgress.activeCourse) {
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
          <div key={unit.id}>
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={undefined}
              activeLessonPercentage={0}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage