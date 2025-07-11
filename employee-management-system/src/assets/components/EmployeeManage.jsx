import React, { useState } from "react";

const data = [
  {
    id: 1001,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Thomas",
    lastName: "Leannon",
    email: "Thomas.Leannon@dummyapis.com",
    contactNumber: "4121091095",
    age: 43,
    dob: "26/08/1979",
    salary: 1,
    address: "Address1",
  },
  {
    id: 1002,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Faye",
    lastName: "Sauer",
    email: "Faye.Sauer@dummyapis.com",
    contactNumber: "4914696673",
    age: 60,
    dob: "28/06/1962",
    salary: 2,
    address: "Address2",
  },
  {
    id: 1003,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Deven",
    lastName: "Halvorson",
    email: "Deven.Halvorson@dummyapis.com",
    contactNumber: "4479795571",
    age: 29,
    dob: "06/01/1993",
    salary: 3,
    address: "Address3",
  },
  {
    id: 1004,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Melisa",
    lastName: "Schuppe",
    email: "Melisa.Schuppe@dummyapis.com",
    contactNumber: "4443995334",
    age: 38,
    dob: "06/09/1984",
    salary: 4,
    address: "Address4",
  },
  {
    id: 1005,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Dell",
    lastName: "Kris",
    email: "Dell.Kris@dummyapis.com",
    contactNumber: "4505692843",
    age: 89,
    dob: "14/03/1933",
    salary: 5,
    address: "Address5",
  },
  {
    id: 1006,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Marcia",
    lastName: "Gutmann",
    email: "Marcia.Gutmann@dummyapis.com",
    contactNumber: "4746199430",
    age: 56,
    dob: "24/07/1966",
    salary: 6,
    address: "Address6",
  },
  {
    id: 1007,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Jarrod",
    lastName: "Ortiz",
    email: "Jarrod.Ortiz@dummyapis.com",
    contactNumber: "4859095720",
    age: 82,
    dob: "26/12/1940",
    salary: 7,
    address: "Address7",
  },
  {
    id: 1008,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Gabriella",
    lastName: "Wilkinson",
    email: "Gabriella.Wilkinson@dummyapis.com",
    contactNumber: "4379190775",
    age: 36,
    dob: "24/06/1986",
    salary: 8,
    address: "Address8",
  },
  {
    id: 1009,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Elisabeth",
    lastName: "Hayes",
    email: "Elisabeth.Hayes@dummyapis.com",
    contactNumber: "4394091994",
    age: 66,
    dob: "17/08/1956",
    salary: 9,
    address: "Address9",
  },
  {
    id: 1010,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    firstName: "Jaime",
    lastName: "Reichel",
    email: "Jaime.Reichel@dummyapis.com",
    contactNumber: "4622392580",
    age: 41,
    dob: "21/01/1981",
    salary: 10,
    address: "Address10",
  },
];
const EmployeeManage = () => {
  const [employeeList, setEmployeeList] = useState(structuredClone(data));
  const [employeeToShow, setEmployeeToShow] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [formData, setFormData] = useState({
    id:"",
    firstName: "",
    lastName: "",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/0/93.png",
    email: "",
    contactNumber: "",
    salary: "",
    address: "",
    dob: "",
  });

  const handleOpenEmployeeDetails = (id) => {
    return () => {
      const employee = employeeList.filter((employee) => employee.id === id);
      console.log(employee);
      setEmployeeToShow(...employee);
      setShowDetails(true);
    };
  };

  const handleAddEmployee = () => {
    const oldEmployee = [...employeeList];
    const employeeWithId = {
      ...formData,
      id: Date.now().toString() // Generate a unique ID (can also use uuid)
    };
    oldEmployee.push(employeeWithId);
    setEmployeeList(oldEmployee);
    setShowAddEmployeeForm(false);
  };

  const deleteEmployee = (id) =>{
    return ()=>{
        const employee = employeeList.filter((employee) => employee.id != id);
        setEmployeeList(employee);
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div id="app">
      <header class="header">
        <h1>Employee Database Management</h1>
        <button
          class="createEmployee"
          onClick={() => setShowAddEmployeeForm(!showAddEmployeeForm)}
        >
          Add Employee
        </button>
        {showAddEmployeeForm && (
          <div className="addEmployee">
            <form className="addEmployee_create" onSubmit={handleAddEmployee}>
              <p>Add a new Employee</p>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL (Optional)"
                value={formData.imageUrl}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="contactNumber"
                placeholder="Contact"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
                className="addEmployee_create--dob"
                required
              />
              <input
                type="submit"
                className="addEmployee_create--submit"
                value="Submit"
              />
            </form>
          </div>
        )}
      </header>

      <div class="employees">
        <div class="employees__names">
          <span class="employees__names--title">Employee List</span>
          <div class="employees__names--list">
            {employeeList?.map((employee) => {
              return (
                <div key={employee.id} className="employees__names--item">
                  {" "}
                  <span onClick={handleOpenEmployeeDetails(employee.id)}>
                    {employee.firstName} {employee.lastName}{" "}
                  </span>
                  <i class="employeeDelete" onClick={deleteEmployee(employee.id)}>❌</i>
                </div>
              );
            })}
          </div>
        </div>
        <div class="employees__single">
          <div class="employees__single--title">Employee Information</div>
          {showDetails && (
            <div class="employees__single--info">
              <img src={`${employeeToShow?.imageUrl}`} />
              <span class="employees__single--heading">
                {employeeToShow?.firstName} {employeeToShow?.lastName} (
                {employeeToShow?.age})
              </span>
              <span>{employeeToShow?.address}</span>
              <span>{employeeToShow?.email}</span>
              <span>Mobile - {employeeToShow?.contactNumber}</span>
              <span>DOB - {employeeToShow?.dob}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManage;
