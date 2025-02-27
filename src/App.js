import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AllUsers from "./Users/pages/AllUsers";
import MyPlace from "./Places/pages/MyPlace";
import NewPlace from "./Places/pages/NewPlace";
import DefaultLayout from "./layout/DefaultLayout";
import Auth from "./Users/pages/Auth";
import { AuthContext } from "./context/auth-context";
import { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const login = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  let route;

  if (isLoggedIn) {
    route = (
      <>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<AllUsers />} />
          <Route path="/user/:userId" element={<MyPlace />} />
          <Route path="/place/new" element={<NewPlace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  } else {
    route = (
      <>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<AllUsers />} />
          <Route path="/authenticate" element={<Auth />} />
        </Route>
        <Route path="*" element={<Navigate to="/authenticate" />} />
      </>
    );
  }

  return (
    <>
      <AuthContext value={{ isLoggedIn, userId, login, logout }}>
        <BrowserRouter>
          <Routes>{route}</Routes>
        </BrowserRouter>
      </AuthContext>
    </>
  );
};

export default App;
