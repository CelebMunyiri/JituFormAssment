const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

const { userRouter } = require('./Routes/userRoute')
const app=express()
app.use(bodyParser.urlencoded({ extended:true}))

app.use(express.json())
app.use('/user',userRouter)


app.listen(6000,()=>{
    console.log("Server Working on port 6000")
})