import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import View from "./Components/View";
import Issue from "./Components/Issue";
import Return from "./Components/Return";
import Search from "./Components/Search";
import CustomLayout from "./Layout/CustomLayout";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CustomLayout />}>
            {" "}
            <Route index element={<Navigate to="/view" />} />{" "}
            <Route path="view" element={<View />} />{" "}
            <Route path="search" element={<Search />} />{" "}
            <Route path="issue" element={<Issue />} />{" "}
            <Route path="return" element={<Return />} />{" "}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
