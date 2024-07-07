import "./App.css";
import { UserContext } from "./contexts/Context";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Header = React.lazy(() => import("./components/header-component"));

const CourseRoute = React.lazy(() => import("./routes/course.route"));
const BranchRoute = React.lazy(() => import("./routes/branch.route"));
const LogoutRoute = React.lazy(() => import("./routes/logout.route"));
const SchoolRoute = React.lazy(() => import("./routes/school.route"));
const StudentRoute = React.lazy(() => import("./routes/student.route"));
const StudentIdRoute = React.lazy(() => import("./routes/student-id.route"));
const SchoolLoginRoute = React.lazy(() => import("./routes/school-login.route"));
const StudentLoginRoute = React.lazy(() => import("./routes/student-login.route"));
const SchoolRegisterRoute = React.lazy(() => import("./routes/school-register.route"));
const StudentRegisterRoute = React.lazy(() => import("./routes/student-register.route"));

function App() {
  const [user, setUser] = useState<undefined | null | string>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleDrawer = () => {
    if (isDrawerOpen) {
      console.log(isDrawerOpen);
      setIsDrawerOpen(false);
    } else {
      console.log(isDrawerOpen);
      setIsDrawerOpen(true);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user);
    }

    if (!user) {
      const token: string | null = localStorage.getItem("token");
      if (token) setUser(token);
    }
  }, [user]);

  const globalContextVars = { user, setUser, isDrawerOpen, handleDrawer };

  return (
    <UserContext.Provider value={globalContextVars}>
      <Router>
        <Suspense fallback="Header ...">
          <Header />
        </Suspense>
        <Routes>
          <Route path="*" element={<SchoolLoginRoute />} />
          <Route path="/logout" element={<LogoutRoute />} />
          <Route path="/school" element={<SchoolRoute />} />
          <Route path="/course" element={<CourseRoute />} />
          <Route path="/student" element={<StudentRoute />} />
          <Route path="/student/id" element={<StudentIdRoute />} />
          <Route path="/branch/:branchId" element={<BranchRoute />} />
          <Route path="/school/login" element={<SchoolLoginRoute />} />
          <Route path="/student/:studentId" element={<StudentRoute />} />
          <Route path="/student/login" element={<StudentLoginRoute />} />
          <Route path="/school/register" element={<SchoolRegisterRoute />} />
          <Route path="/student/register" element={<StudentRegisterRoute />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
