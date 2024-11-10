import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./user/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route path="/" element={<HomePage />}></Route>

        {/* Admin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
