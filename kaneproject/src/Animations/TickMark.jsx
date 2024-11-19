import React from 'react';
import Lottie from 'lottie-react';
import success from "./../Assets/Success.json";

const TickMark = ({msg}) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        zIndex: "9999",
      }}
    >
      <div style={{ padding: "42px" }}>
        <Lottie animationData={success} loop={false} style={{ height: 340, width: 340 }} />
      </div>
      <h3>{msg}</h3>
    </div>
  );
};

export default TickMark;