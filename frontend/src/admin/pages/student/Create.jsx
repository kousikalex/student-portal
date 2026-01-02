import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course_id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    bloodGroup: "",
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

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/student",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(res.data.message || "Student created successfully!");
      navigate("/student/index");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form");
    }
  };

  // ✅ Cancel form
  const cancelForm = () => {
    setFormData({
      course_id: "",
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title">Create / Student</h4>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/student/index")}
            >
              Back
            </button>
          </div>

          <form className="forms-sample" onSubmit={handleSubmit}>
            {/* ✅ Course Dropdown */}
            <div className="form-group">
              <label>Course</label>
              <select
                name="course_id"
                className="form-control"
                value={formData.course_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a Course --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Student Name */}
            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </div>

            {/* ✅ Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>

            {/* ✅ Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            {/* Phone Number */}
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Emergency Contact Name */}
            <div className="form-group">
              <label>Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                className="form-control"
                value={formData.emergencyContactName}
                onChange={handleChange}
              />
            </div>

            {/* Emergency Contact Number */}
            <div className="form-group">
              <label>Emergency Contact Number</label>
              <input
                type="text"
                name="emergencyContactNumber"
                className="form-control"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
              />
            </div>

            {/* Blood Group */}
            <div className="form-group">
              <label>Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                className="form-control"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>

            {/* ✅ Buttons */}
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

export default StudentForm;
