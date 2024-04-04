import { Metadata } from "next";
import { Footer } from "./Footer"
import { Header } from "./Header"

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Duo clone",
  description: "Duo clone App",
  icons: {
    icon: "/mascot.svg"
  }
};

const layout = ({ children }: Props ) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default layout