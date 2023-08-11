const registerForm=document.getElementById('registerForm')
const firstName=document.getElementById('firstName').value
const lastName=document.getElementById('lastName').value
const jituEmail=document.getElementById('jituEmail').value
const userCohort=document.getElementById('userCohort').value
const password=document.getElementById('password').value
let userMessage=document.querySelector('.userMessage')

let legitEmail=`${firstName.toLowerCase()}.${lastName.toLowerCase()}@thejitu.com`

registerForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let user =
    firstName !== "" &&
    lastName !== "" &&
    jituEmail !== "" &&
    password !== "" &&
    userCohort !== "";

  if (user) {
  
    if(legitEmail){
    const promise=new Promise((resolve,reject)=>{
        fetch('http://localhost:4500/user/register', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              "firstName": firstName,
                    "lastName": lastName,
                   "jituEmail":jituEmail,
                 "password": password,
                 "userCohort":userCohort
            })
          })
          .then(res=>(res.json())).then(data=>{
            console.log(data)
            userMessage.textContent=data.message
            userMessage.style.display="block"
            window.location.href='./login.html'

            resolve(data)
          }).catch(error=>{
            console.log(error)
            userMessage.textContent=data.message
            userMessage.style.display="block"
            userMessage.style.color="red"
            reject(error)
          })
    }) 
}  
  }
})
