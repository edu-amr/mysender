"use client";

import Lottie from "lottie-react";
import successAnimation from "../../../../../public/downloads/success.json";

export default function SuccessAnimation() {
  return <Lottie animationData={successAnimation} loop={false} style={{ width: 350, height: 350 }}  />;
}
