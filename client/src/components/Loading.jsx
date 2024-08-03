// Loading.js
import React from "react";

const Loading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
      <p>Loading...</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  loader: {
    border: "16px solid #f3f3f3",
    borderTop: "16px solid #3498db",
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 2s linear infinite",
  },
};

export default Loading;