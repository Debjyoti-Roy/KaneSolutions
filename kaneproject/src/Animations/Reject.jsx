import React from 'react';
import Lottie from 'lottie-react';
import Reject from "./../Assets/Reject.json";

const Rejection = ({msg}) => {
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
        <Lottie animationData={Reject} loop={true} style={{ height: 540, width: 540 }} />
      </div>
      <h3>{msg}</h3>
    </div>
  );
};

export default Rejection;