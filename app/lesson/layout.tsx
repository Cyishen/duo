import { Metadata } from "next";

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

const LessonLayout = ({ children }: Props) => {
  return ( 
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  );
};
 
export default LessonLayout;
