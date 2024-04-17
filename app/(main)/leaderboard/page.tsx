import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";

import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

import { hardcodedUsers } from "@/constants";
import { cn } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import Ani from "./ani";

const LearderboardPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();

  const [
    userProgress,
    userSubscription,
    leaderboard,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderboardData,
  ]);

  const { userId } = await auth();
  const user = await currentUser();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  const leaderboardMargin = [...hardcodedUsers, ...leaderboard];
  leaderboardMargin.sort((a, b) => b.points - a.points);

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
        <div className="w-full flex flex-col items-center">
          <div className="relative">
            <Image
              src="/leaderboard.svg"
              alt="Leaderboard"
              height={90}
              width={90}
            />
            <Image
              src="/user/2.svg"
              alt="Leaderboard"
              height={60}
              width={60}
              className="absolute top-7 -left-14"
            />
            <Image
              src="/user/3.svg"
              alt="Leaderboard"
              height={60}
              width={60}
              className="absolute top-9 -right-14"
            />
          </div>

          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            排行榜
          </h1>

          <Separator className="mb-4 h-0.5 rounded-full" />

          {leaderboardMargin.map((userProgress, index) => (
            <div 
              key={userProgress.userId}
              className={cn(
                "flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50",
                userProgress.userId === userId && "bg-yellow-100"
              )}
            >
              <div className="flex justify-center w-8"> 
                {(index + 1) <= 3 && (
                  <Image
                    src={`/user/${index + 1}.svg`}
                    alt={`${index + 1}st place`}
                    width={30}
                    height={30}
                  />
                )}

                {(index + 1) > 3 && (
                  <p className="font-bold text-lime-600">{index + 1}</p>
                )}
              </div>

              <Avatar
                className="border bg-green-500 h-12 w-12 ml-3 mr-6"
              >
                <AvatarImage
                  className="object-cover"
                  src={userProgress.userImageSrc}
                />
              </Avatar>

              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground relative">
                {userProgress.userId === userId && 
                (
                  <div className="absolute -top-8 -left-20">
                    <Ani />
                  </div>
                )}
                {userProgress.points} 經驗
              </p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default LearderboardPage;
