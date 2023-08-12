const registerForm=document.getElementById('registerForm')
const firstName=document.getElementById('firstName')
const lastName=document.getElementById('lastName')
const jituEmail=document.getElementById('jituEmail')
const userCohort=document.getElementById('userCohort')
const password=document.getElementById('password')
let userMessage=document.querySelector('.userMessage')


registerForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let user =
    firstName.value !== "" &&
    lastName.value !== "" &&
    jituEmail.value !== "" &&
    password.value !== "" &&
    userCohort.value !== "";

if (user) {
  
    const promise=new Promise((resolve,reject)=>{
        fetch('http://localhost:4500/user/register', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              "firstName": firstName.value,
            "lastName": lastName.value,
             "jituEmail":jituEmail.value,
            "password": password.value,
             "userCohort":userCohort.value
            })
          })
          .then(res=>(res.json()))
          .then(data=>{
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
})
