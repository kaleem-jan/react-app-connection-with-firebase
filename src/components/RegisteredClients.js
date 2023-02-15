import React, { useState, useEffect } from 'react'
import '../App.css'
import { DeleteOutlined } from '@ant-design/icons'

import { db, auth } from '../firebase-config';
import ClientServices from '../services/ClientServices';

import StaticExample from './StaticExample';
import { Navigate } from 'react-router-dom';

function RegisteredClients() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ error: false, msg: '' });
    const [todos, setTodos] = useState([]);
    const [showModal, setShow] = useState(false);
    const [modalData, setModalData] = useState();


    const fetchPost = async () => {
        ClientServices.getAllClients().then(querySnapshot => {
            const newData = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setTodos(newData);
        })

        // await getDocs(collection(db, "Dashboard"))
        //     .then((querySnapshot) => {
        //         const newData = querySnapshot.docs
        //             .map((doc) => ({ ...doc.data(), id: doc.id }));
        //         setTodos(newData);
        //         console.log(todos, newData);
        //     })
    }

    useEffect(() => {
        fetchPost();
    }, [])
    const updateData = (obj) => {
        setShow(true);
        setModalData(obj)
        

    }
    const handleLogout = () => {     
        console.log("Signed out")    
        auth.signOut().then(() => {
        // Sign-out successful.
            Navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
    const deleteRow = (obj) => {
        ClientServices.deleteClient(obj.id)
    }

    const submit = async (e) => {
        // e.preventDefault();
        setMessage('');

        ClientServices.addClient({ name, email, password })

        if (name === "" || name === null || password === '' || password === null || email === '' || email === null) {
            setMessage({ error: true, msg: 'All field are mandatory' })
            return;
        }
        const newClientregisteration = {
            name, email, password
        }

    }
    const styles = {
        pointer: {
            cursor: 'pointer',
        },
        buttonStyle: {
            padding: '3px 25px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: 'rgba(0,200,0,0.5)'
        }
    }
    return (
        <>
            <div style={{
                position: 'relative',
            }}>
                <button
                    style={{
                        position: 'absolute',
                        right: '0px',
                        top: '3rem',
                        padding: '3px 25px',
                        border: 'none',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(300,0,0,0.5)'
                    }}
                    onClick= {handleLogout}
                >Logout</button>
            </div>
            <div style={{
                position: 'absolute',
                marginTop: "7rem",
                marginLeft: '10rem',
            }}>
                <input type="text" name='name' placeholder='Enter the name'
                    onChange={(e) => {
                        setName(e.target.value);
                    }

                    } />
                <input type="text" name='name' placeholder='Enter Gmail id'
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }} />

                <input type="text" name='name' placeholder='Enter password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button onClick={submit}>Add Clien</button>
            </div>
            <div className='Register-client-list ' >


                {todos.map((obj, index) => {
                    return <React.Fragment key={index}>
                        <div className='d-flex justify-content-between mb-4'>
                            <div>
                                name : {obj.name}
                            </div>
                            <div style={styles.pointer}>
                                Password : {obj.password}
                            </div>
                            <div style={styles.pointer}>
                                Email : {obj.email}
                            </div>
                            <div>
                                <button style={styles.buttonStyle}
                                    onClick={() => updateData(obj)}>Update</button>
                            </div>
                            <div
                                style={
                                    { "margin": "0px 10px" }
                                }
                                onClick={() => deleteRow(obj)}
                            >
                                <div
                                    style={styles.pointer}><DeleteOutlined /></div>
                            </div>
                        </div>
                    </React.Fragment>
                })}

            </div>

            <StaticExample openModal={showModal} data={modalData} closeModal={() => {
                setShow(false)
            }} />

            
        </>
    )
}

export default RegisteredClients
