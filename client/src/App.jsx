import * as React from "react";

// 1. import `ChakraProvider` component
import { RouterProvider } from "react-router-dom";
import { persistor, store } from "./store/store";
import { router } from "./routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
