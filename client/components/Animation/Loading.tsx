import Lottie from "lottie-react";
import loading from "./Loading.json";

export default function Loading() {
  return (
    <div
      style={{ height: "400px", width: "400px" }}
      className="mx-auto mt-[15%]"
    >
      <Lottie animationData={loading} />
    </div>
  );
}
