import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import App from "./App";
import { logger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import rootReducer from "./modules";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
