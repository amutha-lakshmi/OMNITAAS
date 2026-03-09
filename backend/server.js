const express=require("express")
const app=express()
const cors=require("cors")
const jwt=require("jsonwebtoken")

app.use(cors())
app.use(express.json())

const SECRET="AmuthaSecret"
const logoutuser=[]
function auth(req,res,next)
{
    const header=req.headers.Authorization
    if(!header)
    {
        return res.status(401).json({msg:"token missing"})
    }
    const token=header.split(" ")[1]
    try{
        const decode=jwt.verify(token,SECRET)
        res.user=decoded
        next()
    }
    catch(err)
    {
        return res.status(403).json({msg:"Invalid credentials"})
    }
}

app.post("/api/login",(req,res)=>{
    const {username,password}=req.body
    if(username=="admin" && password=="admin123")
    {
        const token=jwt.sign({username},SECRET,{expiresIn:"1h"})
        return res.status(200).json({
            msg:"Login succesfull",
            token
        })
    }
    return res.status(401).json({msg:"invalid credentials"})
})

app.get("/api/profile",auth,(req,res)=>{
    res.json({
        username:req.user.username,
        msg:"welcome"
    })
})

app.post("/api/logout",auth,(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    logoutuser.push(token)
    res.json({msg:"logged out"})
})

app.listen(3000,()=>console.log("server running ....."))


