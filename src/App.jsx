import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Signin from "./pages/Signin.jsx";
// import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail";
import Report from "./pages/Report";
import TaskDetail from "./pages/TaskDetail";
import TeamManagement from "./pages/TeamManagement.jsx";

function App() {
  return (
    <div className="bg-gray-200">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/teams" element={<TeamManagement />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
