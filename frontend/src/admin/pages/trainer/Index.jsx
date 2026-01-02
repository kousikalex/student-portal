import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const DataTable = () => {
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState([]);

  // ✅ Fetch all trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trainers");
        setTrainer(res.data.data); // ✅ FIX 1
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
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
                  <h4 className="card-title mb-0">Trainer Table</h4>
                  <Link
                    to="/trainer/create"
                    className="btn btn-primary"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Create
                  </Link>
                </div>
              </div>

              <div className="col-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Specialist</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                        {/* <th>Add</th> */}
                      </tr>
                    </thead>

                    <tbody>
                      {trainer.length > 0 ? (
                        trainer.map((trainers, index) => (
                          <tr key={trainers._id}>
                            <td>{index + 1}</td>
                            <td>{trainers.name}</td>
                            <td>{trainers.specialist || "N/A"}</td>
                            <td>{trainers.phone || "N/A"}</td>

                            {/* <td>
                              <button className="btn btn-outline-primary btn-sm">
                                View
                              </button>
                            </td> */}

                            <td>
                              <button
                                className="btn btn-outline-success btn-sm"
                                onClick={() => handleAddClick(trainers._id)} // ✅ FIX 2
                              >
                                ADD
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No trainers found
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
