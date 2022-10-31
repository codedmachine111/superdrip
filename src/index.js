import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById("root")
);
