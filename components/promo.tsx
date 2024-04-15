import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image
            src="/super.svg"
            alt="Pro"
            height={20}
            width={78}
          />
          <h3 className="font-bold text-lg">
            免費體驗Super
          </h3>
        </div>

        <div className="flex items-center gap-x-2">
          <p className="text-muted-foreground">
            無廣告, 答錯不扣愛心, 學習加倍
          </p>
          <Image
            src="/unlimited.svg"
            alt="Pro"
            height={26}
            width={26}
          />
        </div>
      </div>

      <Button
        asChild
        variant="super"
        className="w-full"
        size="lg"
      >
        <Link href="/shop">
          體驗 Super
        </Link>
      </Button>
    </div>
  );
};
