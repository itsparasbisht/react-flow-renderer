import "./App.css";
import SubFlow from "./components/SubFlow";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/subflow" element={<SubFlow />} />
          <Route path="/added" element={<SubFlow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
