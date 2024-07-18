import React from "react";
import { ThreeDots } from "react-loader-spinner";

const LoadingFormII = () => {
  return (
    <div className="custom-three-dots">
      <ThreeDots
        visible={true}
        height="40"
        width="40"
        color="#FFFFFF"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingFormII;
