import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { Metadata } from "next";
import { MobileFooter } from "@/components/mobile-footer";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Duo clone",
  description: "Duo clone App",
  icons: {
    icon: "/mascot.svg"
  }
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-2 lg:pt-6 h-[100vh]">
          {children}
        </div>

        <div className="h-[30vh]" />
      </main>

      <MobileFooter />
    </>
  );
};
 
export default MainLayout;
