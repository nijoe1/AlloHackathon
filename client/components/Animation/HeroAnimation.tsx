import Lottie from "lottie-react";
import funding from "./funding.json";
import rocket from "./Rocket.json";

export default function HeroAnimation() {
  return (
    <div className="flex justify-center items-center ">
      <div
        style={{ height: "300px", width: "300px" }}
        className="flex flex-col items-center justify-center "
      >
        <Lottie animationData={rocket} />
      </div>
      <div
        style={{ height: "190px", width: "190px" }}
        className="flex flex-col items-center justify-center "
      >
        <Lottie animationData={funding} />
      </div>
    </div>
  );
}
