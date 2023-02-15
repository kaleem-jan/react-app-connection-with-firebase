import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css';

function Landing() {

    const navigate = useNavigate();
    return (
        <div>
            <div className='buttons'>
                <button
                style={{
                    'padding': '5px 30px',
                    'alignItems': 'center',
                    'lineHeight': '1'

                }}
                onClick = {() => { navigate("/login")}}
                >
                    <p>Press to Login</p>
                </button>
                <button
                style={{
                    'padding': '5px 30px',
                    'alignItems': 'center',
                    'lineHeight': '1'

                }}
                onClick= {()=> { navigate("/signup")}}
                >
                    <p>Press to Signup</p>
                </button>
            </div>
        </div>
    )
}

export default Landing
