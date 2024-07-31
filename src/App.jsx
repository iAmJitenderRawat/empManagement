import * as React from "react";

// 1. import `ChakraProvider` component
import { RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { router } from "./routes";
import { Provider } from "react-redux";

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
