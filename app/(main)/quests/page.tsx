import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";

import { getUserProgress, getUserSubscription } from "@/db/queries";

import { Progress } from "@/components/ui/progress";
import { quests } from "@/constants";

// import { Promo } from "@/components/promo";

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return ( 
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {/* {!isPro && (
          <Promo />
        )} */}
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-blue-900 min-h-[200px] rounded-2xl p-5 relative">
            <h1 className="text-center font-bold text-white text-2xl my-6">
              免費體驗 Super
            </h1>

            <Image
              src="/super.svg"
              alt="super"
              height={23}
              width={86}
              className="absolute m-4 top-0 right-0"
            />
          </div>

          <h1 className="w-full font-bold text-neutral-800 text-2xl my-6 z-10">
            任務
          </h1>

          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  className="flex items-center w-full p-4 gap-x-4 border-t-2"
                  key={quest.title}
                >
                  <Image
                    src="/points.svg"
                    alt="Points"
                    width={60}
                    height={60}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>

                    <Progress value={progress} className="h-4" />
                    
                    <p className="text-right">
                      {userProgress.points}/ {quest.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default QuestsPage;
