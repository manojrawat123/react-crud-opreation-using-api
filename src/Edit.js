import React, { useState, useEffect } from "react";
import { NavLink, Router, useParams } from "react-router-dom";

export default function Edit(props) {
  const [employ_data, setData] = useState(["no data"]);
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();

  const changeEvent = (e) => {
    setName(e.target.my_name);
    setAge(e.target.age);
    setCity(e.target.city);
    setEmail(e.target.email)
    if (e.target.value === ""){
        e.target.style.outline = "1px solid red"
        e.target.style.border= "1px solid red"
    }
    else{
        e.target.style.outline = "#22c55e"
        e.target.style.border = "2px solid #22c55e"
    }
  };
  const { id } = useParams();
  const get_data_by_id = () => {
    const fet_employee1 = fetch(`http://127.0.0.1:8000/myapi/${id}`)
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        setName(value.name);
        setCity(value.city);
        setEmail(value.email);
        setAge(value.age);
      });
  };
  useEffect(() => {
    get_data_by_id();
  }, [employ_data]);

  const editData = async () => {
    const myheaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const cname = document.getElementById("name").value;
    const cemail = document.getElementById("email").value;
    const cage = document.getElementById("age").value;
    const ccity = document.getElementById("city").value;
    const my_body1 =  {
        name: cname,
        email: cemail,
        age: cage,
        city: ccity
    }
    const my_body = JSON.stringify(my_body1);
    const update_data = await fetch(`http://127.0.0.1:8000/myapi/${id}/`, {
      method: "PUT",
      headers: myheaders,
      body: my_body,
    })
    if (update_data.ok == true){
        alert("your Data updated Successfully")
    }
    else{
        alert("Something went wrong")
    }
  };
  return (
    <>
      <div className="w-[50vw] mx-auto my-10">
        <h1 className="bg-cyan-300 text-3xl font-semibold text-white text-center py-4">
          Edit Employees
        </h1>
        <label>Name:</label> <br />
        <input
          type="text"
          className="border-2 border-solid border-gray-700 w-[100%] h-10 rounded outline-green-500"
          id="name"
          name="my_name"
          value={name}
          onChange={changeEvent}
        />
        <br />
        <br />
        <label>Email:</label> <br />
        <input
          type="email"
          className="border-2 border-solid border-gray-700 w-[100%] h-10 rounded outline-green-500"
          id="email"
          name="email"
          value={email}
          onChange={changeEvent}
        />
        <br />
        <br />
        <label>Age:</label> <br />
        <input
          type="number"
          className="border-2 border-solid border-gray-700 w-[100%] h-10 rounded outline-green-500"
          id="age"
          name="age"
          value={age}
          onChange={changeEvent}
        />
        <br />
        <br />
        <label>City:</label> <br />
        <input
          type="text"
          className="border-2 border-solid border-gray-700 w-[100%] h-10 rounded outline-green-500"
          id="city"
          name="city"
          value={city}
          onChange={changeEvent}
        /> 
        <br />
        <br />
        <div className="text-center">
          <button
            onClick={editData}
            className="mx-4 border border-solid border-blue-500 text-blue-700 font-semibold py-2 px-4 hover:text-white hover:bg-blue-500 rounded"
          >
            Update{" "}
          </button>
          <NavLink to={"/"}>
            <button className="border border-solid border-blue-500 text-blue-700 font-semibold py-2 px-4 hover:text-white hover:bg-blue-500 rounded">
              Back To Home Page{" "}
            </button>
          </NavLink>
        </div>
        <br />
      </div>
    </>
  );
}
