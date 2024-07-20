import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import "@mantine/core/styles.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { ApiProvider } from "./context/ApiContext";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
          <ApiProvider>
            <App />
          </ApiProvider>
          <Toaster position="bottom-center" duration={500} />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);