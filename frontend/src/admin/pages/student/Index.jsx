import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DataTable = () => {
  const [subtopics, setSubtopics] = useState([]);

  // ✅ Fetch all subtopics when component loads
  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student");
        setSubtopics(res.data);
      } catch (error) {
        console.error("Error fetching subtopics:", error);
      }
    };

    fetchSubtopics();
  }, []);

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-12 d-flex">
                 {/* justify-content-between align-items-center */}
                <h4 className="card-title mb-0 justify-content-left">Subtopic Data Table</h4>
                <button className="btn btn-primary justify-content-right ms-auto">
                  <Link
                    to="/student/create"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Create student
                  </Link>
                </button>
                <button className="btn btn-success ps-3 ms-2">
                  <Link
                    to="/student/upload"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Upload student
                  </Link>
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table id="order-listing" className="table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Course</th>
                    <th> Name</th>
                    <th>Email</th>
                    <th>Actoin</th>
                  </tr>
                </thead>

                <tbody>
                  {subtopics.length > 0 ? (
                    subtopics.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.course_id?.name || "N/A"}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                          <button className="btn btn-outline-primary me-2">
                            View
                          </button>
                          <button className="btn btn-outline-warning me-2">
                            Edit
                          </button>
                          <button className="btn btn-outline-danger">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No subtopics found
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
  );
};

export default DataTable;
