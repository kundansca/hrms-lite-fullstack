import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} /> */}
          <Route path="/add-employee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
