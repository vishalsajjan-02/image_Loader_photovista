import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/feedSlice"; // ✅ Import the store
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}> {/* ✅ Wrap App with Redux Provider */}
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
