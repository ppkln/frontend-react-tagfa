import Axios from "axios";
import { useState } from "react";

function App() {
  const currDate = new Date();
  const thaiDate = currDate.toLocaleString();

  const [email, setEmail] = useState("");
  const [pws, setPws] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");

  const [newPhone,setNewPhone] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/createEmployee", {
      email: email,
      pws: pws,
      fname: fname,
      lname: lname,
      phone: phone,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          email: email,
          pws: pws,
          fname: fname,
          lname: lname,
          phone: phone,
        },
      ]);
    });
  };

  const updateNewPhone = (id) =>{
    Axios.put("http://localhost:3001/updateNewPhone",{phone:newPhone,id:id}).then((response)=>{
      setEmployeeList(
        employeeList.map((val)=>{
          if(val.id === id){
            return {
              email:val.email,
              pws:val.pws,
              fname:val.fname,
              lname:val.lname,
              phone:newPhone
            }
          } else{
            return val;
          }
        })
      )
    })
  }

  const deleteEmployee= (id) => {
    Axios.delete(`http://localhost:3001/deleteEmployee/${id}`).then((response)=>{
      setEmployeeList(
        employeeList.filter((val)=>{
          return val.id !== id;
        })
      );

    })
  }

  return (
    <div className="App container mt-4 mb-3 border1 ">
      <div>
          <p> วันที่ : {thaiDate} </p>
          <div className="text-center">
          <a href="http://localhost:3000"><img src="http://localhost:3000/logo-nueng1.png" alt="#" width="80px" /></a>
          <h5 >Welcome to LN shop</h5>
          </div>
          <br></br>
          <div className="information card ">
            <form action="">
              <div className="mt-2 mb-2  ">
                <label htmlFor="email" className="form-label me-2 ms-2">
                  E-mail:
                </label>
                <input
                  type="email"
                  className="form-control me-2 ms-2"
                  id="email"
                  name="email"
                  style={{ width: "300px" }}
                  placeholder="Enter E-mail"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  required
                ></input>
              </div>
              <div className="mt-2 mb-2  ">
                <label htmlFor="pws" className="form-label me-2 ms-2">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control me-2 ms-2"
                  id="pws"
                  name="pws"
                  style={{ width: "300px" }}
                  placeholder="Enter Password"
                  onChange={(event) => {
                    setPws(event.target.value);
                  }}
                  required
                ></input>
              </div>
              <div className="mt-2 mb-2  ">
                <label htmlFor="fname" className="form-label me-2 ms-2">
                  First Name:{" "}
                </label>
                <input
                  type="text"
                  className="form-control me-2 ms-2"
                  id="fname"
                  name="fname"
                  style={{ width: "300px" }}
                  placeholder="Enter First Name"
                  //pattern="^[ก-๏a-zA-Z]{2,}$"
                  onChange={(event) => {
                    setFname(event.target.value);
                  }}
                  required
                ></input>
              </div>
              <div className="mt-2 mb-2  ">
                <label htmlFor="lname" className="form-label me-2 ms-2">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="form-control me-2 ms-2"
                  id="lname"
                  name="lname"
                  style={{ width: "300px" }}
                  placeholder="Enter Last Name"
                  //pattern="^[ก-๏a-zA-Z]{2,}$"
                  onChange={(event) => {
                    setLname(event.target.value);
                  }}
                  required
                ></input>
              </div>
              <div className="mt-2 mb-2  ">
                <label htmlFor="phone" className="form-label me-2 ms-2">
                  Phone Number:
                </label>
                <input
                  type="text"
                  className="form-control me-2 ms-2"
                  id="phone"
                  name="phone"
                  style={{ width: "300px" }}
                  maxLength="10"
                  placeholder="Enter Phone Number"
                  //pattern="^0([6|8|9])([0-9]){8}$"
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  required
                ></input>
              </div>
              <div className="mt-2 mb-2  ">
                <button
                  type="submit"
                  className="btn btn-primary mt-2 mb-2 me-5 ms-5"
                  onClick={addEmployee}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr></hr>
        {/* ส่วนของการแสดงข้อมูล employee จากฐานข้อมูลที่อยู่ฝั่ง Back-end */}
        <div className="employeeShow">
          <button
            type="button"
            className="btn btn-success me-2 ms-2 mt-2 mb-2"
            onClick={getEmployees}
          >
            Show Employees
          </button>
        </div>
        <br></br>
          {employeeList.map((val) => {
            return (
              <div className="employee card">
                <div className="card-body text-left">
                  <p className="card-text">E-mail: {val.email}</p>
                  <p className="card-text">First Name: {val.fname}</p>
                  <p className="card-text">Last Name: {val.lname}</p>
                  <p className="card-text">Phone Number: {val.phone}</p>
                  <div className="d-flex  mb-3">
                    <input type="text" id="newPhone" className="form-control" style={{width:"300px"}} 
                    placeholder="Enter new phone number if you want" maxLength={10} pattern="^0([6|8|9])([0-9]){8}$"
                    onChange={(event)=>{
                      setNewPhone(event.target.value);
                    }}></input>
                    <button className="btn-sm btn-warning ms-2" onClick={()=>{updateNewPhone(val.id)}}>Update</button>
                    <button className="btn-sm btn-danger ms-2" onClick={()=>{deleteEmployee(val.id)}}>Delete</button>
                  </div>
                  <p className="card-text">Date of Register: {val.regisDate}</p>
                </div>
              </div>
            );
          })}
      
    </div>
  );
}

export default App;
