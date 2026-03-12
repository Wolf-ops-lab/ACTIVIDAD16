const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmpassword')

// Evento submit
form.addEventListener('submit', function(e){
    e.preventDefault()
    checkInputs()
})

function checkInputs(){

    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const confirmPasswordValue = confirmPassword.value.trim()

    if(usernameValue === ''){
        setError(username, "Username is required")
    } else if(usernameValue.length < 3){
        setError(username, "Username must be at least 3 characters")
    } else {
        setSuccess(username)
    }

    if(emailValue === ''){
        setError(email, "Email is required")
    } else if(!isEmail(emailValue)){
        setError(email, "Email is not valid")
    } else {
        setSuccess(email)
    }

    if(passwordValue === ''){
        setError(password, "Password is required")
    } else if(passwordValue.length < 6){
        setError(password, "Password must be at least 6 characters")
    } else {
        setSuccess(password)
    }

    if(confirmPasswordValue === ''){
        setError(confirmPassword, "Confirm password is required")
    } else if(confirmPasswordValue !== passwordValue){
        setError(confirmPassword, "Passwords do not match")
    } else {
        setSuccess(confirmPassword)
    }
}

function setError(input, message){

    const formControl = input.parentElement
    const small = formControl.querySelector("small")

    small.innerText = message

    formControl.className = "form-control error"
}

function setSuccess(input){

    const formControl = input.parentElement
    formControl.className = "form-control success"
}

function isEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}