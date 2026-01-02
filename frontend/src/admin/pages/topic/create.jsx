import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseDropdown = () => {
  const [courses, setCourses] = useState([]);
  const [subcourses, setSubcourses] = useState([]);
  const [formData, setFormData] = useState({
    course_id: "",
    subcourse_id: "",
    name: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch all courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // ✅ Fetch subcourses when a course is selected
  useEffect(() => {
    if (formData.course_id) {
      const fetchSubcourses = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/subcourse/byCourse/${formData.course_id}`
          );
          setSubcourses(res.data);
        } catch (err) {
          console.error("Error fetching subcourses:", err);
        }
      };
      fetchSubcourses();
    } else {
      setSubcourses([]); // Clear subcourses if no course selected
    }
  }, [formData.course_id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("course_id", formData.course_id);
    data.append("subcourse_id", formData.subcourse_id);
    data.append("name", formData.name);

    try {
      const res = await axios.post("http://localhost:5000/api/topic", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      navigate("/topic/index");
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  const cancelForm = () => {
    setFormData({
      course_id: "",
      subcourse_id: "",
      name: "",
    });
    setSubcourses([]);
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title">Create / Topic</h4>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/topic/index")}
            >
              Back
            </button>
          </div>

          <form className="forms-sample" onSubmit={handleSubmit}>
            {/* Course Dropdown */}
            <div className="form-group">
              <label>Course</label>
              <select
                name="course_id"
                className="form-control"
                value={formData.course_id}
                onChange={handleChange}
              >
                <option value="">-- Select a Course --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcourse Dropdown (Dependent) */}
            <div className="form-group">
              <label>Sub Course</label>
              <select
                name="subcourse_id"
                className="form-control"
                value={formData.subcourse_id}
                onChange={handleChange}
                disabled={!formData.course_id}
              >
                <option value="">
                  {formData.course_id
                    ? "-- Select a Subcourse --"
                    : "Select a Course first"}
                </option>
                {subcourses.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic name */}
            <div className="form-group">
              <label>Topic Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Topic Name"
                required
              />
            </div>

            {/* Buttons */}
            <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={cancelForm}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseDropdown;
