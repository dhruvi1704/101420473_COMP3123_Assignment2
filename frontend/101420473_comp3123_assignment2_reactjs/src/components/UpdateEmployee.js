import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UpdateEmployee.css";


const UpdateEmployee = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3333/api/v1/emp/employees/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setName(response.data.name);
        setDepartment(response.data.department);
        setPosition(response.data.position);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch employee details");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3333/api/v1/emp/employees/${id}`,
        { name, department, position },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Employee updated successfully");
      navigate("/employees");
    } catch (err) {
      console.error(err);
      alert("Failed to update employee");
    }
  };

  return (
    <div className="container">
      <h2>Update Employee</h2>
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
        <button type="submit" className="btn btn-primary">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
