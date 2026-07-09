import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ResumeDetails from "./pages/ResumeDetails";
import History from "./pages/History";
import AnalyticsPage from "./pages/AnalyticsPage";
import AboutProject from "./pages/AboutProject";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/resume/:id" element={<ResumeDetails />} />
        <Route path="/history" element={<History />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/about" element={<AboutProject />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
