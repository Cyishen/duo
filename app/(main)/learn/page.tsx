import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/user-progress"

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {/* sticky on desktop */}
      <StickyWrapper>
        <UserProgress 
          activeCourse={{ imageSrc: '/es.svg', title: 'Learn' }} 
          hearts={5} 
          points={100} 
          hasActiveSubscription={false} 
        />
      </StickyWrapper>

      {/* Feed on mobile */}
      <FeedWrapper>
        <Header title="spanish" />
        
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