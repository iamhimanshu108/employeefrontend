import { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const Dashboard = () => { 
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const limit = 5;

  const backendUrl = process.env.REACT_APP_API_URL || 'https://employeemanager-w22t.onrender.com';

  useEffect(() => {
    const fetchEmployees = async () => {
      
      try {
        const response = await fetch(`${backendUrl}/api/employees?limit=${limit}`);
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchEmployees();
  }, [limit,backendUrl]);

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`${backendUrl}/api/employee/${employeeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEmployees((prevEmployees) => {
          return prevEmployees.filter((employee) => employee.id !== employeeId);
        });
        console.log(`Employee with id ${employeeId} has been deleted`);
      } else {
        console.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const handleUpdate = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center text-white">Employees</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department}</td>
                    <td>
                      <Button variant="info" className="me-2" onClick={() => handleUpdate(employee.id)}>
                        Update
                      </Button>
                      <Button variant="danger" onClick={() => deleteEmployee(employee.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
