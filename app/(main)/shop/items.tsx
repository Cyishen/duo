"use client";

import Image from "next/image";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { POINTS_TO_REFILL } from "@/constants";
import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";


type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts()
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image 
          src="/heart.svg"
          alt="Heart"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            補心
          </p>
          <p className="text-muted-foreground">
            消費寶石獲取愛心全滿
          </p>
        </div>
        <Button
          size="lg"
          onClick={onRefillHearts}
          disabled={
            pending
            || hearts === 5 
            || points < POINTS_TO_REFILL
          }
        >
          {hearts === 5
            ? "已滿"
            : (
              <div className="flex items-center">
                <Image
                  src="/points.svg"
                  alt="Points"
                  height={20}
                  width={20}
                />
                <p>
                  {POINTS_TO_REFILL}
                </p>
              </div>
            )
          }
        </Button>
      </div>

      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image
          src="/unlimited.svg"
          alt="Unlimited"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            無限愛心
          </p>
          <p className="text-muted-foreground">
            無廣告, 答錯不扣愛心, 學習加倍
          </p>
        </div>
        <Button
          size="lg"
          onClick={onUpgrade}
          disabled={pending}
        >
          {hasActiveSubscription ? "設定" : "體驗"}
        </Button>
      </div>
    </ul>
  );
};
