"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { recoverHearts } from "@/actions/user-progress";

type Props = {
  hearts: number;
}

export const HeartRecover = ({hearts}: Props) => {
  const [nextRecoveryTime, setNextRecoveryTime] = useState(Date.now() + 10 * 60 * 1000);

  const totalHearts = 5; 
  const filledHearts = Math.min(hearts, totalHearts);
  const emptyHearts = totalHearts - filledHearts;

  const heartImages = [];

  for (let i = 0; i < filledHearts; i++) {
    heartImages.push(<Image key={`heart-${i}`} src="/heart.svg" alt="heart" width={28} height={28} />);
  }

  for (let i = 0; i < emptyHearts; i++) {
    heartImages.push(<Image key={`empty-heart-${i}`} src="/heart_empty.svg" alt="empty-heart" width={28} height={28} />);
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await recoverHearts();
        setNextRecoveryTime(Date.now() + 10 * 60 * 1000);
      } catch (error) {
        console.error('Error recovering hearts:', error);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex">
          {heartImages}
        </div>

        <h3 className="font-bold text-lg">
          獲取一顆愛心還需要 10 分鐘
        </h3>
      </div>
    </div>
  );
};