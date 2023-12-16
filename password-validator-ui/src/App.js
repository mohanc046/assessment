import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PasswordValidator from "./screens/PasswordValidator";

export default function App() {

  return <Router>
    <Routes>
      <Route path="/*" element={<PasswordValidator />} />
    </Routes>
  </Router>
}

