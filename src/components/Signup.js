import React, {useState, useContext} from "react";
import { useNavigate } from 'react-router-dom'
import NoteContext from "../context/notes/noteContext";

const Signup = () => {
  const context = useContext(NoteContext);
  const {showAlert} = context;
  const navigate = useNavigate()

  const [user, setUser] = useState({
      name:"",
      email:"",
      password:"",
      cpassword:""
  })

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name, email, password} = user;
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
              method: 'POST',
              headers: {
                  "Content-Type":"application/json",
              } ,
              body: JSON.stringify({name, email, password}) 

          });
          const json = await response.json()
          // console.log(json)
          // if user Sign up successfull
          if(json.success){
              // save auth token and redirect
              showAlert("Signup successfull", "success");
              
              localStorage.setItem('token',json.AuthToken)
              navigate("/")
          }

          // if Sign up not successfull
          else{
              showAlert("Signup unsuccessfull", "danger");
              
              // alert("Enter valid credentials")
          }
  }

  const onChange = (e) => {
      setUser({...user, [e.target.name]:e.target.value})
  }
  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>
        <h2 className="my-2">Create an account to use to Inotebook</h2>
        <div className="form-group">
          <label for="name">Name</label>
          <input type="name" className="form-control" id="name"  name="name" onChange={onChange} placeholder="Enter name"/>
        </div>
        <div className="form-group">
          <label for="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password"/>
        </div>
        <div className="form-group">
          <label for="cpassword">Confirm password</label>
          <input type="cpassword" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Confirm password"/>
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}

export default Signup;