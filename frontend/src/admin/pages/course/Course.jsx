import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BasicForm = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("duration", formData.duration);
    data.append("description", formData.description);
    if (formData.file) data.append("file", formData.file);

    try {
      const res = await axios.post("http://localhost:5000/api/courses", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      setFormData({ name: "", duration: "", description: "", file: null });
       navigate("/admin/index");
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

   const cancelForm = async (e) => {
     navigate("/admin/index");

  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Course</h4>

          <form className="forms-sample" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                className="form-control"
                value={formData.duration}
                onChange={handleChange}
                placeholder="ex: 50 hours"
              />
            </div>

            <div className="form-group">
              <label>File upload</label>
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={handleChange}
              />
            </div>

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

export default BasicForm;
