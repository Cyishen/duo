"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

import Lottie from "lottie-react";
import ad from "@/public/lottie/ad.json"

export const Ad = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between w-full space-y-2">
          <h3 className="font-bold text-lg">
            廣告
          </h3>
          <Link href="/shop">
            <Button
              size="sm"
              variant="primaryOutline"
            >
              無廣告體驗
            </Button>
          </Link>
        </div>

        <div>
          <Lottie
            animationData={ad} 
            loop={true}
          />
        </div>
      </div>
    </div>
  );
};
