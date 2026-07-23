import React, {useState, useContext} from "react";
import { useNavigate } from 'react-router-dom'
import NoteContext from "../context/notes/noteContext";

const Login = () => {
  const navigate = useNavigate()
  const context = useContext(NoteContext);
  const {showAlert} = context;
  const host = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState({
      email:"",
      password:""
  })

  const handleSubmit = async (e) => {
    console.log(`${host}/api/auth/loginuser`)
      e.preventDefault();
      const response = await fetch(`${host}/api/auth/loginuser`, {
              method: 'POST',
              headers: {
                  "Content-Type":"application/json",
              } ,
              body: JSON.stringify({email: user.email, password: user.password}) 

          });
          const json = await response.json()
          // console.log(json)
          // if user log in successfull
          if(json.success){
              // save auth token and redirect
              showAlert("Login successfull", "success")
              localStorage.setItem('token',json.AuthToken)
              navigate("/home");
          }
          // if login not successfull
          else{
              showAlert("Login unsuccessfull", "danger")
          }
  }

  const onChange = (e) => {
      setUser({...user, [e.target.name]:e.target.value})
  }

  return (
    
    <div className="mt-3">
      <h2 className="my-2">Login to continue to Inotebook</h2>
      <form onSubmit={handleSubmit} >
        <div className="form-group" >
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={user.email} aria-describedby="emailHelp" onChange={onChange}/>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={onChange}/>
        </div>

        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
