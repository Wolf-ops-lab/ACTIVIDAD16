const form = document.getElementById('form')
const username = document.getElementById('username')
const age = document.getElementById('age')
const url = document.getElementById('url')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmpassword')

form.addEventListener('submit', function(e){
    e.preventDefault()
    checkInputs()
})

function checkInputs(){

    const usernameValue = username.value.trim()
    const ageValue = age.value.trim()
    const urlValue = url.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const confirmPasswordValue = confirmPassword.value.trim()

    // USERNAME
    if(usernameValue === ''){
        setError(username, "Username is required")
    } else if(usernameValue.length < 3){
        setError(username, "Username must be at least 3 characters")
    } else {
        setSuccess(username)
    }

    // AGE
    if(ageValue === ''){
        setError(age, "Age is required")
    } else if(ageValue < 0 || ageValue > 999){
        setError(age, "Age must be between 0 and 999")
    } else {
        setSuccess(age)
    }

    // URL
    if(urlValue === ''){
        setError(url, "Url is required")
    } else if(!isURL(urlValue)){
        setError(url, "Url is not valid")
    } else {
        setSuccess(url)
    }

    // EMAIL
    if(emailValue === ''){
        setError(email, "Email is required")
    } else if(!isEmail(emailValue)){
        setError(email, "Email is not valid")
    } else {
        setSuccess(email)
    }

    // PASSWORD
    if(passwordValue === ''){
        setError(password, "Password is required")
    } else if(passwordValue.length < 6){
        setError(password, "Password must be at least 6 characters")
    } else {
        setSuccess(password)
    }

    // CONFIRM PASSWORD
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

function isURL(url){

    const pattern = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\.-]*)*\/?$/
    return pattern.test(url)
}