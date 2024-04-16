import { MobileItem } from "./mobile-item";

export const MobileFooter = () => {
  return (
    <nav className="lg:hidden px-4 h-[88px] flex items-center bg-white border-t fixed bottom-0 w-full z-50">
      <div className="flex justify-between w-full gap-2">
        <MobileItem 
          href="/learn"
          iconSrc="/learn.svg"
        />
        <MobileItem 
          href="#"
          iconSrc="/workout.svg"
        />
        <MobileItem 
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <MobileItem 
          href="/quests"
          iconSrc="/quests.svg"
        />
        <MobileItem 
          href="/shop"
          iconSrc="/shop.svg"
        />
      </div>
    </nav>
  );
};