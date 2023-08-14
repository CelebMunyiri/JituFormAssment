const mssql=require('mssql')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {v4}=require('uuid')
const dotenv=require('dotenv')
const joi=require('joi')
const { createUserTable } = require('../Database/Tables/userTable')
const { userRegisterSchema, userLoginSchema } = require('../Validators/userValidator')
const { sqlConfig } = require('../Config/config')
dotenv.config()

const registerUser=async(req,res)=>{
    try {
        
const id=v4()

const {firstName,lastName,jituEmail,password,userCohort}=req.body
const {error}=userRegisterSchema.validate(req.body)
if(error){
    return res.status(422).json(error.details[0].message)
}

const hashedPassword=await bcrypt.hash(password, 8)

const pool=await mssql.connect(sqlConfig)
const result=(await pool.request()
    .input('id',id)
    .input('firstName',firstName)
    .input('lastName',lastName)
    .input('jituEmail',jituEmail)
    .input('password',hashedPassword)
    .input('userCohort',userCohort)
    
    .execute('registerUserProc'))
    if(result.rowsAffected==1){
        return res.status(200).json({message:"User Registered as success"})
    }else{
        return res.status(400).json({message:"Error Registering you"})
    } 
    } catch (error) {
        createUserTable()
        res.json({Error:error.message})
    }
}

const userLogin=async(req,res)=>{
    try {
        const {jituEmail,password}=req.body
        const {error}=userLoginSchema.validate(req.body)
        if(error){
            return res.status(422).json(error.details[0].message)
        }

        const pool=await mssql.connect(sqlConfig)
      const user= (await pool.request().input('jituEmail',mssql.VarChar,jituEmail).execute('loginUserProc')).recordset[0]
    
      const hashedPassword=user.password
      

      if (user){
        const comparePwd=await bcrypt.compare(password, hashedPassword)
       
        if(comparePwd){
            const {password,...payload}=user
            const token=jwt.sign(payload, process.env.SECRET,{expiresIn:'36000s'})
            return res.status(200).json({
                message:'Logged in', token})
        }else{
            return res.status(400).json({
                message:'Invalid Login Credential'
            })
        }
      }else{
        return res.status(400).json({
            message:'User NOt Found' })
      }
    } catch (error) {
        res.json({Error:error.message})
    }
}




module.exports={
    registerUser,
    userLogin,

}
