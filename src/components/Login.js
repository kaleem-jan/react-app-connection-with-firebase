import React, { useReducer, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom'
const Login = () => {


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  const onLogin = (e)=> {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
      // sign in 
      console.log(userCredential)
      userCredential ? navigate("/dashboard") : navigate("/signup")
    }).catch ((error)=> {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage);
    })
  }

  return (
    <>
      <div className='loginform '>
        <div><span>User Email </span>
          <input
            id="email-address"
            name="useremail"
            type="email"
            required
            placeholder='Enter Email'

            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div><span>Password </span>
          <input type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            onChange={ (e) => setPassword(e.target.value)} />
        </div>

        <button
          style={{
            'padding': "2px 50px",
            'marginTop': '30px',
          }}  
          onClick = {onLogin}
          >Login</button>
        <NavLink to="/">Back</NavLink>
      </div>
    </>
  )
}

export default Login
