"use client"

import Lottie from "lottie-react";
import duo from "@/public/lottie/duo.json"

const Ani = () => {

  return (
    <div>
      <Lottie
        animationData={duo} 
        loop={true}
      />
    </div>
  )
}

export default Ani