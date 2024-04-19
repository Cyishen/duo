"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import bookIcon from "./bookIcon";
import { useStartModal } from "@/store/use-start-modal";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({ id, index, totalCount, locked, current, percentage }: Props) => {
  const { isOpen, open, close } = useStartModal();

  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const isBookIcon = bookIcon() && (cycleIndex === 1 || cycleIndex === 3);

  const Icon = isCompleted ? isBookIcon ? bookIcon : isLast ? Crown : Check
  : isLast ? Crown : (cycleIndex === 1 || cycleIndex === 3 ) ? bookIcon : Star;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  const handleClick = () => {
    if (isOpen) {
      close();
    } else {
      open(); 
    }
  };

  return (
    <Link 
      href={href}
      aria-disabled={locked} 
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <>
            <div className="h-[102px] w-[102px] relative">
              <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
                Start
                <div
                  className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2"
                />
              </div>
              
              <CircularProgressbarWithChildren
                value={Number.isNaN(percentage) ? 0 : percentage}
                styles={{
                  path: {
                    stroke: "#4ade80",
                  },
                  trail: {
                    stroke: "#e5e7eb",
                  },
                }}
              >
                <Button
                  size="rounded"
                  variant={locked ? "locked" : "secondary"}
                  className="h-[70px] w-[70px] border-b-8 relative"
                  // onClick={handleClick}
                >
                  <Icon
                    className={cn(
                      "h-10 w-10",
                      locked
                      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                      : "fill-primary-foreground text-primary-foreground",
                      isCompleted && "fill-none stroke-[4]"
                    )}
                  />
                </Button>
                  
                {/* {isOpen && (
                  <div className="absolute -bottom-28 -left-12 p-5 min-w-[200px] font-bold uppercase text-white bg-green-500 rounded-xl tracking-wide z-10">
                    <p>挑戰</p>
                    <Link href={href}>
                      <Button className="w-full">開始</Button>
                    </Link>
                    
                    <div
                      className="absolute left-1/2 -top-1 border-x-[14px] border-x-transparent border-b-8 transform -translate-x-1/2"
                      style={{ borderColor: "transparent transparent #5EC16A" }}
                    />
                  </div>
                )} */}
              </CircularProgressbarWithChildren>
            </div>
          </>
        ) : (
          <>
            <Button
              size="rounded"
              variant={locked ? "locked" : "secondary"}
              className="h-[70px] w-[70px] border-b-8"
            >
              <Icon
                className={cn(
                  "h-10 w-10",
                  locked
                  ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                  : "fill-primary-foreground text-primary-foreground",
                  isCompleted && "fill-none stroke-[3]"
                )}
              />
            </Button>
          </>
        )}
      </div>
    </Link>
  );
};