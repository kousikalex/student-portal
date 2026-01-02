import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DataTable = () => {
  const [courses, setCourses] = useState([]);

  // ✅ Fetch all courses when component loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subcourse");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="row mb-3">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Course Data Table</h4>
                  <button className="btn btn-primary">
                    <Link
                      to="/subcourse/create"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Create
                    </Link>
                  </button>{" "}
                </div>
              </div>

              <div className="col-12">
                <div className="table-responsive">
                  <table id="order-listing" className="table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Course Name</th>
                        <th>Sub Course</th>
                        <th>Duration</th>
                        {/* <th>Description</th> */}
                        <th>Image / File</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {courses.length > 0 ? (
                        courses.map((course, index) => (
                          <tr key={course._id}>
                            <td>{index + 1}</td>
                            <td>{course.course_id?.name || "N/A"}</td>
                            <td>{course.name}</td>
                            <td>{course.duration}</td>
                            {/* <td>{course.description}</td> */}
                            <td>
                              {course.file ? (
                                <img
                                  src={`http://localhost:5000/uploads/subcourse/${course.file}`}
                                  alt={course.name}
                                  width="80"
                                  height="60"
                                  style={{
                                    borderRadius: "6px",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <span>No file</span>
                              )}
                            </td>
                            <td>
                              <button className="btn btn-outline-primary">
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No courses found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
