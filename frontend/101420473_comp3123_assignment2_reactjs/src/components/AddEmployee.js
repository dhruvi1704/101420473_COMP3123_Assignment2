import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddEmployee.css";


const AddEmployee = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3333/api/v1/emp/employees",
        { name, department, position },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Employee added successfully");
      navigate("/employees");
    } catch (err) {
      console.error(err);
      alert("Failed to add employee");
    }
  };

  return (
    <div className="container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
