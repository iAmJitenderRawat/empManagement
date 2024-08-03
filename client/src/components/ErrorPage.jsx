// ErrorPage.js
import React from "react";
// import { useHistory } from "react-router-dom";

const ErrorPage = ({ message }) => {
//   const history = useHistory();

  return (
    <div style={styles.container}>
      <h1>Something went wrong</h1>
      <p>{message || "An unexpected error occurred."}</p>
      {/* <button onClick={() => history.push("/")} style={styles.button}>
        Go to Homepage
      </button> */}
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
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ErrorPage;