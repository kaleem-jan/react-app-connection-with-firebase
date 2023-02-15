import React from 'react';
import '../App.css';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import firebase from 'firebase/app'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import ClientServices from '../services/ClientServices';
import { addDoc, collection } from 'firebase/firestore';

function Signup() {
  
  // inpute validation
  const [errorName, seterrorName] = useState("");
  const [error, setError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  // get user input 
  const [name, setName] = useState("")
  const [phoneNumberInput, setPhoneNumberInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  // validation functions
  function isValidEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  const validateEmail = (e) => {
    const email = e.target.value;
    setEmailInput(email)
    if (isValidEmail(email) || email == "") {
      setError(null)
    } else {
      setError("invalid Email")
    }
  }

  function validateName(e) {
    const testName = e.target.value;
    setName(testName)
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (regName.test(testName) || testName == '') {
      seterrorName("")
    } else {
      seterrorName("First and last name is not in correct order");
    }
  }
  function phoneNumber(e) {
    const inputNumber = e.target.value
    setPhoneNumberInput(inputNumber)
    if (inputNumber.length >= 11 || inputNumber.length == "") {
      setPhoneError("")
    }
    else {
      setPhoneError("Please Enter valid phone number")
    }
  }
  const passwordValidation = (e) => {
    const checkPassword = e.target.value;
    setPassword(checkPassword)
    if (checkPassword.length > 8 || checkPassword.length == "") {
      setPasswordError("")
    }
    else (
      setPasswordError('Password should be atleast 8 digits')
    )
  }

  // other functions

  const signup = async (email, password) => {
    
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        authProvider: "local",
        uid: user.uid,
        password,
        email,
      })
    }  catch (err) {
      console.error(err.code);
      alert(err.message);
    }
  };

  const styles = {
    submitButton: {
      padding: '2px 20px',
      borderRadius: '10px',
      border: "none",
      backgroundColor: '#d4d1d1',
      marginTop: '30px',
      right: '10px'

    },
    loginForm: {
      width: '30rem',
      border: '1px solid #707070',
      padding: '50px',

    },
    validation: {
      color: 'red'
    }
  }

  return (
    <>
      <div className='container'>
        <div style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className="loginForm" style={styles.loginForm}>
            <h3>Signup Form</h3>

            <form action="submitForm" className='formFields d-flex flex-column'>
              <select defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled> Choose salutation</option>
                <option value="1">Mr</option>
                <option value="2">Ms</option>
                <option value="3">Mrs</option>
              </select>
              <label htmlFor="Name">Name</label>
              <input type="text" name='Name' placeholder='Enter your Name' onChange={validateName} />
              <div style={styles.validation} className="errorField"> {errorName} </div>
              <label htmlFor="phone">Phone</label>
              <input type="text" name='phone' placeholder='Enter Phone number' onChange={phoneNumber} />
              <div style={styles.validation} className="errorField">{phoneError}</div>
              <label htmlFor="email">Email</label>
              <input type="text" name='email' placeholder='Enter your E-mail' onChange={validateEmail} />
              <div className="errorField"
                style={styles.validation}
              >{error}</div>
              <label htmlFor="email">Password</label>
              <input type="password" name='password' placeholder='Enter your Password' onChange={passwordValidation} />
              <div style={styles.validation} className="errorField">{passwordError}</div>
            </form>
            <button name='submit' onClick={()=>{signup(emailInput,password)}} style={styles.submitButton}>Submit</button>
            <NavLink to="/">Back</NavLink>
          </div>
        </div>
      </div>



    </>
  )
}

export default Signup