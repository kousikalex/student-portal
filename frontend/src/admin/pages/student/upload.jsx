import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId || !file) {
      alert("Course and Excel file required");
      return;
    }

    const formData = new FormData();
    formData.append("course_id", courseId);
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/studentUpload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(res.data.message);
      navigate("/student/index");
    } catch (error) {
      console.error(error);
      alert("Excel upload failed");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4>Create Students (Excel Upload)</h4>

        <form onSubmit={handleSubmit}>
          {/* Course */}
          <div className="form-group">
            <label>Course</label>
            <select
              className="form-control"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">-- Select Course --</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Excel Upload */}
          <div className="form-group">
            <label>Upload Excel File</label>
            <input
              type="file"
              className="form-control"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <button className="btn btn-primary mt-3">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
