import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react';
interface employee {
  id: number,
  email: string,
  name: string,
  role: string
}
function App() {
  const [employeeList, setEmployeeList] = useState<employee[]>([])
  const [allEmployees, setAllEmployees] = useState<employee[]>([])
  const [activePageNo, setActivePageNo] = useState<number>(1)
  const ITEMS_PER_PAGE=10;
  const getEmployee = async () => {
    try {
      const result = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      setAllEmployees(result.data);
      setEmployeeList(result.data.slice(0, ITEMS_PER_PAGE));
    } catch (error) {
      window.alert("failed to fetch data")
    }
  }
  const handlePageChange = (direction:"Previous"|"Next") => {
    const totalPages = Math.ceil(allEmployees.length / ITEMS_PER_PAGE);
    if (direction === "Next" && activePageNo < totalPages) {
      const nextPage = activePageNo + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      setEmployeeList(allEmployees.slice(startIndex, endIndex));
      setActivePageNo(nextPage);
    } else if (direction === "Previous" && activePageNo > 1) {
      const prevPage = activePageNo - 1;
      const startIndex = (prevPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      setEmployeeList(allEmployees.slice(startIndex, endIndex));
      setActivePageNo(prevPage);
    }
  }
  useEffect(() => {
    getEmployee()
  }, [])
  return (
    <div className='main'>
      <p className='heading'>Employee Data Table</p>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>

          {employeeList?.map((ele) => {
            return (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.role}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button className='btn' onClick={() => handlePageChange("Previous")}>
          Previous
        </button>
       <span className='btn'>
         {activePageNo}
        </span>
        <button className='btn' onClick={() => handlePageChange("Next")}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App
