const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

const { userRouter } = require('./Routes/userRoute')
const app=express()
app.use(bodyParser.urlencoded({ extended:true}))

app.use(express.json())
app.use(cors())
app.use('/user',userRouter)


app.listen(4500,()=>{
    console.log("Server Working on port 4500")
})