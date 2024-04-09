import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/user-progress"
import { redirect } from "next/navigation"

import { getUserProgress } from "@/db/queries"


const LearnPage = async () => {
  const userProgressData = getUserProgress()
  const [ userProgress ] = await Promise.all([ userProgressData, ]);

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
        
        <div className="space-y-4">
          <div className="h-[700px] bg-blue-300"></div>
          <div className="h-[700px] bg-blue-300"></div>
          <div className="h-[700px] bg-blue-300"></div>
        </div>
      </FeedWrapper>
    </div>
  )
}

export default LearnPage