import * as React from "react";

// 1. import `ChakraProvider` component
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/lib/integration/react";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <Provider store={store}>
      <ChakraProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
