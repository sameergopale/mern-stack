import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AllUsers from "./Users/pages/AllUsers";
import MyPlace from "./Places/pages/MyPlace";
import NewPlace from "./Places/pages/NewPlace";
import DefaultLayout from "./layout/DefaultLayout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<AllUsers />} />
            <Route path="/:userId/place" element={<MyPlace />} />
            <Route path="/place/new" element={<NewPlace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
