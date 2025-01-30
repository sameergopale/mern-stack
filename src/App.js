import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AllUsers from "./Users/pages/AllUsers";
import MyPlace from "./Places/pages/MyPlace";
import NewPlace from "./Places/pages/NewPlace";
import Header from "./sharedComponents/Header";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllUsers />} />
          <Route path="/places" element={<MyPlace />} />
          <Route path="/place/new" element={<NewPlace />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
