import Link from "next/link";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className={`w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between`}>
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">
          {title}
        </h3>
        <p className="text-lg">
          {description}
        </p>
      </div>
      
      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="xl:flex border-2 border-b-4 active:border-b-2 rounded-xl"
        >
          <NotebookText />
          <p className="hidden xl:flex ml-2">繼續</p>
        </Button>
      </Link>
    </div>
  );
};