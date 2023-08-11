const loginEmail=document.getElementById('loginjituEmail')
const loginPassword=document.getElementById('loginjitupassword')
const loginForm=document.getElementById('loginForm')
const userMessage=document.querySelector('.userMessage')

let legitEmail=`${firstName.toLowerCase()}.${lastName.toLowerCase()}@thejitu.com`

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    user=loginEmail.value !=="" && loginPassword.value !==""
    if(user && legitEmail){
        const promise=new Promise((resolve,reject)=>{
            fetch('http://localhost:4500/user/login', {
                method:"POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                       "jituEmail":loginEmail.value,
                     "password": loginPassword.value
                   
                })
              })
              .then(res=>(res.json())).then(data=>{
                console.log(data)
               // alert("logged")
                userMessage.textContent=data.message
                userMessage.style.display="block"
                window.location.href='./clubHomepage.html'
    
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