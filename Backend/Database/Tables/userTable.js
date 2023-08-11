const mssql=require('mssql')
//const { sqlConfig } = require('../config/config');

const createUserTable=async(req,res)=>{
    try {
        const tabler=`
        BEGIN 
        TRY 
        CREATE TABLE userTable(
            id VARCHAR(50) PRIMARY KEY,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            jituEmail VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(MAX) NOT NULL,
           userCohort INT NOT NULL
        )
        END TRY
        BEGIN   
        CATCH 
        THROW 50001,'User table Already created as sucess',1
        END CATCH`
const pool=await mssql.connect(sqlConfig)
await pool.query(tabler,(err)=>{
    if(err instanceof mssql.RequestError){
        console.log({Error:err.message})
    }else{
        console.log('Users Table Created succesfully')
    }
})
    } catch (error) {
       console.log(`${error}`)
    }
}

module.exports={
    createUserTable
}