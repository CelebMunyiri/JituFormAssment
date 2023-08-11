const registerForm=document.getElementById('registerForm')
const firstName=document.getElementById('firstName')
const lastName=document.getElementById('lastName')
const jituEmail=document.getElementById('jituEmail')
const userCohort=document.getElementById('userCohort')
const password=document.getElementById('password')

registerForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let user =
    firstName.value !== "" &&
    lastName.value !== "" &&
    jituEmail.value !== "" &&
    password.value !== "" &&
    userCohort.value !== "";

  if (user) {
    axios
      .post(
        "http://localhost:6000/user/register",

        {
          firstName: firstName.value,
          lastName: lastName.value,
          jituEmail:jituEmail,
        password: password.value,
          userCohort: userCohort.value,
        },

        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.href = "./login.html";
      })
      .catch((e) => {
        console.log(e);
      });
  }
})