import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

function Login()
{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const navigate=useNavigate()

    async function handleLogin()
    {
        if(!username || !password.length)
        {
            setError("Invalid input")
            return
        }
        try {
            const res=await axios.post("http://localhost:3000/api/login",{username,password})
        localStorage.setItem("token",res.data.token)
        navigate("/dashboard")
        } catch (error) {
         setError("invalid credentials")   
        }
    }


    return(
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Enter username" value={username} onChange={e=>setUsername(e.target.value)}/>
            <br/><br/>
            <input type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <br/><br/>
            <button onClick={handleLogin}>Login</button>
            <p style={{color:"red"}}>{error}</p>
        </div>
    )
}
 export default Login