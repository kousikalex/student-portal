import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseDropdown = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course_id: "",
    name: "",
    duration: "",
    description: "",
    file: null,
  });

  const navigate = useNavigate();

  // ✅ Fetch all courses on component mount
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

  // ✅ Handle text, select, and textarea changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("course_id", formData.course_id);
    data.append("name", formData.name);
    data.append("duration", formData.duration);
    data.append("description", formData.description);
    if (formData.file) data.append("file", formData.file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/subcourse",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(res.data.message);
      navigate("/subcourse/index"); // ✅ Redirect after success
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  // ✅ Cancel form
  const cancelForm = () => {
    setFormData({
      course_id: "",
      name: "",
      duration: "",
      description: "",
      file: null,
    });
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title">Create / Select Course</h4>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin/index")}
            >
              Back
            </button>
          </div>

          <form className="forms-sample" onSubmit={handleSubmit}>
            {/* Dropdown */}
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
            <div className="form-group">
              <label>Sub Course</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. 50 hours"
              />
            </div>

            {/* Duration */}
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                className="form-control"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 50 hours"
              />
            </div>

            {/* File upload */}
            <div className="form-group">
              <label>File Upload</label>
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
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
