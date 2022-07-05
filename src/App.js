import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateFlow from "./components/CreateFlow";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateFlow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
