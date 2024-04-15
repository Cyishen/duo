import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/es.svg" 
            alt="Spanish" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          西班牙語
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/us.svg" 
            alt="Croatian" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          英語
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/mascot.svg" 
            alt="French" 
            height={30} 
            width={30}
            className="mr-4 rounded-md"
          />
          Duo
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/jp.svg" 
            alt="Japanese" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          日語
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/kr.svg" 
            alt="Italian" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          韓語
        </Button>
      </div>
    </footer>
  );
};