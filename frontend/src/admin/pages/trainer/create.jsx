import React, { useState } from "react";
import axios from "axios";

const TrainerCreate = () => {
  const [trainer, setTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    specialist: "",
    emergencyContactPerson: "",
    emergencyContactNumber: "",
    bloodGroup: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
    address: "",
  });

  const handleChange = (e) => {
    setTrainer({ ...trainer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/trainers", trainer);
      alert("Trainer saved successfully");
    } catch (error) {
      console.error(error);
      alert("Error saving trainer");
    }
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create Trainer</h4>

            <form onSubmit={handleSubmit}>
              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <input className="form-control" name="name" onChange={handleChange} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" onChange={handleChange} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Phone Number</label>
                  <input className="form-control" name="phone" onChange={handleChange} required />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Specialist</label>
                  <input className="form-control" name="specialist" onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Emergency Contact Person</label>
                  <input className="form-control" name="emergencyContactPerson" onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Emergency Contact Number</label>
                  <input className="form-control" name="emergencyContactNumber" onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Blood Group</label>
                  <input className="form-control" name="bloodGroup" onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Bank Name</label>
                  <input className="form-control" name="bankName" onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Account Number</label>
                  <input className="form-control" name="accountNumber" onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label>IFSC Code</label>
                  <input className="form-control" name="ifscCode" onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Branch</label>
                  <input className="form-control" name="branch" onChange={handleChange} />
                </div>

                <div className="col-md-12 mb-3">
                  <label>Address</label>
                  <textarea className="form-control" name="address" onChange={handleChange}></textarea>
                </div>

              </div>

              <button className="btn btn-primary">Save Trainer</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCreate;
