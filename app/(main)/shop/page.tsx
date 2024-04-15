import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";

import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

import { getUserProgress, getUserSubscription } from "@/db/queries";

import { Items } from "./items";
import { Button } from "@/components/ui/button";

const ShopPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData
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
        {!isPro && (
          <Promo />
        )}
        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <div className="md:hidden mb-4">
          <UserProgress 
            activeCourse={userProgress.activeCourse} 
            hearts={userProgress.hearts} 
            points={userProgress.points} 
            hasActiveSubscription={isPro} 
          />
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-blue-900 min-h-[200px] rounded-2xl p-5 relative">
            <h1 className="text-center font-bold text-white text-2xl my-6">
              免費體驗 Super
            </h1>

            <Button
              size="lg"
              className="w-full mt-5"
            >
              體驗 Super
            </Button>

            <Image
              src="/super.svg"
              alt="super"
              height={23}
              width={86}
              className="absolute m-4 top-0 right-0"
            />
          </div>

          <h1 className="w-full font-bold text-neutral-800 text-2xl my-6 z-10">
            愛心
          </h1>

          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default ShopPage;
