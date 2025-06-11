import { Container, Table } from 'react-bootstrap';

const Employees = () => {
  const dummyEmployees = [
    { id: 1, name: 'John Doe', position: 'Manager', department: 'Operations', email: 'john@travex.com' },
    { id: 2, name: 'Jane Smith', position: 'Developer', department: 'IT', email: 'jane@travex.com' },
    { id: 3, name: 'Bob Johnson', position: 'Analyst', department: 'Finance', email: 'bob@travex.com' },
  ];

  return (
    <Container className="mt-5">
      <h2>Employees</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dummyEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Employees;