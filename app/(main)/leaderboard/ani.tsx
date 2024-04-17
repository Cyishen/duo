"use client"

import Lottie from "lottie-react";
import champion from "@/public/lottie/champion.json"

const Ani = () => {

  return (
    <div className="flex justify-center">
      <Lottie
        animationData={champion} 
        loop={true}
        className="w-20 h-20"
      />
    </div>
  )
}

export default Ani