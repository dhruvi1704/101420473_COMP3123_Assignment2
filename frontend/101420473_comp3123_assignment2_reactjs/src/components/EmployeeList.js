import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeList.css";
import { fetchEmployees, deleteEmployee } from '../services/api';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      //const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3333/api/v1/emp/employees");
        //headers: { Authorization: `Bearer ${token}` },
        console.log("Employees fetched:", response.data);
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch employees");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      //const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3333/api/v1/emp/employees/${id}`, {
        //headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h2>Employee List</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/add-employee")}
      >
        Add Employee
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>
              <button
                className="btn btn-success"
                onClick={() => navigate("/add-employee")}
                >
                Add Employee
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/view-employee/${employee._id}`)}
                >
                  View
                </button>{" "}
                <button
                  className="btn btn-warning"
                  onClick={() => navigate(`/update-employee/${employee._id}`)}
                >
                  Update
                </button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
