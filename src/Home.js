import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function Home() {
    const sendData = ()=>{
        const myheaders = {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        }
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const age = document.getElementById("age").value;
        const city = document.getElementById("city").value;
        const my_body1 =  {
            name: name,
            email: email,
            age: age,
            city: city
        }
        const my_body = JSON.stringify(my_body1);
        fetch("http://127.0.0.1:8000/myapi/", {method:"POST", headers: myheaders, body:my_body}).then((value)=>{
            return value.json()
        }).then((value)=>{
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("age").value = "";
            document.getElementById("city").value = "";
        });
    }

    const [employ_data, setData] = useState(["no data"]);
    const fetch_func = ()=>{
        
        const fet_employee1 = fetch("http://127.0.0.1:8000/myapi/").then((value)=>{
            return value.json();
        }).then((value)=>{
            setData(value)
        });
    }
    const deleteFunc = async(id)=>{
        const value1 = await fetch(`http://127.0.0.1:8000/myapi/${id}`,{method: "DELETE"});
        
    }
    useEffect(()=>{
        fetch_func();
    },[employ_data])
    return (
    <> 
    <h1 className='text-center bg-green-500 text-3xl font-semibold text-white mx-8 my-4'>React Crud API Call</h1>
    <div className='grid grid-cols-2 gap-10 mx-8 my-8'>
        <div className="col-span-1">
        <h1 className="bg-cyan-300 text-3xl font-semibold text-white text-center py-4">Add Employees</h1>
        <label>Name:</label> <br/>
        <input type='text' className='border-2 border-solid border-gray-700 w-[100%] h-10 rounded outline-green-500' id='name'/><br/><br/>
        <label>Email:</label> <br/>
        <input type='email' className='border-2 border-solid border-gray-700 w-[100%] h-10 rounded outline-green-500' id='email'/><br/><br/>
        <label>Age:</label> <br/>
        <input type='number' className='border-2 border-solid border-gray-700 w-[100%] h-10 rounded outline-green-500' id='age'/><br/><br/>
        <label>City:</label> <br/>
        <input type='text' className='border-2 border-solid border-gray-700 w-[100%] h-10 rounded outline-green-500' id='city' /><br/><br/>
        <div className='text-center'>
        <button onClick={sendData} className='border border-solid border-blue-500 text-blue-700 font-semibold py-2 px-4 hover:text-white hover:bg-blue-500 rounded'>Save </button>
        </div>
        <br/>
        </div>
    <div className='col-span-1'>
        <h1 className='bg-black text-3xl font-semibold text-white text-center py-4'>Employees Details</h1>
        <table className='w-[100%]'>
            <thead>
        <tr>
            <th className='text-start py-4'>Id</th>
            <th className='text-start py-4'>Name</th>
            <th className='text-start py-4'>Email</th>
            <th className='text-start py-4'>Age</th>
            <th className='text-start py-4'>City</th>
            <th className='text-start py-4'>Action</th>

            
        </tr>
        </thead>
        <tbody>
       {employ_data.map((element, index)=>{
        return <tr key={index}>
        <td>{index + 1}</td>
        <td>{element.name}</td>
        <td>{element.email}</td>
        <td>{element.age}</td>
        <td>{element.city}</td>
        <td className='w-[11rem]'>

            <NavLink to={`edit/${element.id}`}>
            <button className='text-white font-semibold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 mx-2'>
            Edit
            </button></NavLink>
            <button className='text-white font-semibold py-2 px-4 rounded bg-red-500 hover:bg-red-700 mx-2' onClick={()=>{
        deleteFunc(element.id);
    }}>
            Delete
            </button>
            </td>
        </tr>
       })}
            </tbody>
               </table>
    </div>

    </div>
    </>
  )
}
