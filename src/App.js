import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/user/:username" element={<Profile />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
