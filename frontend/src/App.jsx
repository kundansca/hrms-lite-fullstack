import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import AddEmployee from "./pages/AddEmployee";
import AllEmployees from "./pages/AllEmployees";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/employees" element={<AllEmployees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
