import * as React from "react";

// 1. import `ChakraProvider` component
import LandingPage from "./containers/LandingPage/LandingPage";

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <LandingPage />
  );
}

export default App;
