"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

type Props = {
  iconSrc: string;
  href: string;
};

export const MobileItem = ({ iconSrc, href }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      size='smm'
      variant={active ? "sidebarOutline"  : "sidebar"}
      className="flex h-[55px]"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={iconSrc}
          height={50}
          width={50}
        />
      </Link>
    </Button>
  );
};