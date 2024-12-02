import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ViewEmployee.css";


const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3333/api/v1/emp/employees/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch employee details");
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="container">
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Position:</strong> {employee.position}</p>
    </div>
  );
};

export default ViewEmployee;
