import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DataTable = () => {
  const [subtopics, setSubtopics] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState(null);

  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSubtopicId) {
      alert("Subtopic ID missing!");
      return;
    }

    const formData = new FormData();
    formData.append("subtopic_id", selectedSubtopicId);
    if (file) formData.append("pdf", file);
    if (video) formData.append("video", video);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Response:", res.data);
      alert("Upload Successful!");
      setOpenModal(false);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload Failed!");
    }
  };

  // ✅ Fetch all subtopics when component loads
  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subtopic");
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
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Subtopic Data Table</h4>
                <button className="btn btn-primary">
                  <Link
                    to="/subtopic/create"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Create
                  </Link>
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table id="order-listing" className="table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Topic</th>
                    <th>Subtopic Name</th>
                    <th>Action</th>
                    <th>Data</th>
                  </tr>
                </thead>

                <tbody>
                  {subtopics.length > 0 ? (
                    subtopics.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                          {item.topic_id?.subcourse_id?.name || "N/A"}{" "}
                          {/* ✅ SubCourse Name */}-
                          {item.topic_id?.name || "N/A"}
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <button className="btn btn-outline-warning me-2">
                            Edit
                          </button>
                          <button className="btn btn-outline-danger">
                            Delete
                          </button>
                        </td>
                        <button
                          className="btn btn-outline-primary me-2"
                          onClick={() => {
                            setSelectedSubtopicId(item._id); // <-- store id here
                            setOpenModal(true);
                          }}
                        >
                          Update Doc/Video
                        </button>
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
              {openModal && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0,0,0,0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                  }}
                >
                  <div
                    style={{
                      width: "400px",
                      padding: "20px",
                      background: "#fff",
                      borderRadius: "8px",
                    }}
                  >
                    <h3>Upload Document / Video</h3>

                    <form onSubmit={handleSubmit}>
                      {/* hidden subtopic_id */}
                      <input type="hidden" value={selectedSubtopicId} />

                      <div className="mt-3">
                        <label>Upload File:</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>

                      <div className="mt-3">
                        <label>Upload Video:</label>
                        <input
                          type="file"
                          accept="video/*"
                          className="form-control"
                          onChange={(e) => setVideo(e.target.files[0])}
                        />
                      </div>

                      <div className="mt-4 d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setOpenModal(false)}
                        >
                          Close
                        </button>

                        <button type="submit" className="btn btn-primary">
                          Upload
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
