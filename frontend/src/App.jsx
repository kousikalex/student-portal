import React from "react";
import Sidebar from "./user/layout/sidebar.jsx";
import Header from "./components/Header";
// import Home from "./pages/Home.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./user/layout/UserLayout.jsx";
import AdminLayout from "./admin/layout/AdminLayout.jsx";

// User Routes
import Course from "./user/pages/Course.jsx";
import Subcourse from "./user/pages/Subcourse.jsx";

// Admin Routes
import Dashboard from "./admin/pages/Dashboard.jsx";
import AdminCourse from "./admin/pages/course/Course.jsx";
import Courseindex from "./admin/pages/course/Index.jsx";
import Subcourseindex from "./admin/pages/subcourse/Index.jsx";
import Subcoursecreate from "./admin/pages/subcourse/Create.jsx";
import Topiccreate from "./admin/pages/topic/create.jsx";
import Topicindex from "./admin//pages/topic/Index.jsx";
import Subtopiccreate from "./admin/pages/subtopic/create.jsx";
import Subtopicindex from "./admin/pages/subtopic/Index.jsx";
import StudentCreate from "./admin/pages/student/Create.jsx";
import StudentIndex from "./admin/pages/student/Index.jsx";
import StudentUpload from "./admin/pages/student/upload.jsx";
import TrainerIndex from "./admin/pages/trainer/Index.jsx";
import TrainerCreate from "./admin/pages/trainer/Create.jsx";

import LoginPage from "./user/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* USER ROUTES */}
        <Route element={<UserLayout />}>
          <Route path="/course/:course_id" element={<Course />} />
          <Route path="/subcourse/:subcourseId" element={<Subcourse />} />
        </Route>

        <Route>
          <Route path="/student/login" element={<LoginPage />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          {/* course */}
          <Route path="/admin/course" element={<AdminCourse />} />
          <Route path="/admin/index" element={<Courseindex />} />

          {/* sub-Course */}
          <Route path="subcourse/create" element={<Subcoursecreate/>} />
          <Route path="subcourse/index" element={<Subcourseindex />} />

          {/* topic */}
          <Route path="topic/create" element={<Topiccreate />} />
          <Route path="topic/index" element={<Topicindex />} />

           {/* subtopic */}
          <Route path="subtopic/create/:id" element={<Subtopiccreate />} />
          <Route path="subtopic/index" element={<Subtopicindex />} />

          {/* Student */}
          <Route path="student/create" element={<StudentCreate />} />
          <Route path="student/index" element={<StudentIndex />} />
          <Route path="student/upload" element={<StudentUpload />} />

          {/* trainer */}
          <Route path="trainer/create" element={<TrainerCreate />} />
          <Route path="trainer/index" element={<TrainerIndex />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
