import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DataTable = () => {
  const navigate = useNavigate();
  //  const { id } = useParams();
  const [topic, setCourses] = useState([]);

  // ✅ Fetch all courses when component loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/topic`);
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddClick = (id) => {
    navigate(`/subtopic/create/${id}`);
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="row mb-3">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Topic Table</h4>
                  <button className="btn btn-primary">
                    <Link
                      to="/topic/create"
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

                        <th>Course</th>
                        <th>Sub Course</th>
                        <th>Topic</th>

                        <th>Action</th>
                        <th>Subtopic</th>
                      </tr>
                    </thead>

                    <tbody>
                      {topic.length > 0 ? (
                        topic.map((topics, index) => (
                          <tr key={topics._id}>
                            <td>{index + 1}</td>

                            {/* ✅ Course Name */}
                            <td>
                              {topics.subcourse_id?.course_id?.name || "N/A"}
                            </td>

                            {/* ✅ SubCourse Name */}
                            <td>{topics.subcourse_id?.name || "N/A"}</td>
                            <td>{topics.name}</td>
                            {/* <td>{course.duration}</td> */}
                            {/* <td>{course.description}</td> */}

                            <td>
                              <button className="btn btn-outline-primary">
                                View
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => handleAddClick(topics._id)}
                              >
                                ADD
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
