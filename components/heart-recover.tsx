"use client"

import { useEffect, useState } from "react";
import { recoverHearts } from "@/actions/user-progress";

export const HeartRecover = () => {
  const [nextRecoveryTime, setNextRecoveryTime] = useState(Date.now() + 10 * 1000);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await recoverHearts();
        setNextRecoveryTime(Date.now() + 10 * 1000);
      } catch (error) {
        console.error('Error recovering hearts:', error);
      }
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <h3 className="font-bold text-lg">
          離愛心恢復還需要 {Math.floor((nextRecoveryTime - Date.now()) / 1000)} 秒
        </h3>
      </div>
    </div>
  );
};