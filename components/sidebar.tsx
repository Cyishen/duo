import Link from "next/link";
import Image from "next/image";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";
import { isAdmin } from "@/lib/admin";
import { Button } from "./ui/button";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Duo
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem 
          label="學習" 
          href="/learn"
          iconSrc="/learn.svg"
        />
        <SidebarItem 
          label="排行榜" 
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem 
          label="特別任務" 
          href="/quests"
          iconSrc="/quests.svg"
        />
        <SidebarItem 
          label="寶石商店" 
          href="/shop"
          iconSrc="/shop.svg"
        />
        <div className="p-4">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>

          <div className="flex items-center w-full">
              <ClerkLoaded>
                <UserButton afterSignOutUrl="/" />
                <p className="flex w-full ml-5 text-sm font-medium text-slate-500">更多</p>
              </ClerkLoaded>
              
              <div className="flex justify-end w-full">
                {isAdmin() ? (
                  <Link href="/admin">
                    <Button
                      size="sm"
                      variant="primary"
                    >
                      Admin
                    </Button>
                  </Link>
                ) : ""}
              </div>
          </div>
        </div>
      </div>


    </div>
  );
};