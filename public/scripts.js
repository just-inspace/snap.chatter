/*********************************
 * 
 * This script file will control:
 *      -Client requests
 *      -Maintain token
 *      -TODO // ADD MORE
 * 
 */

// TO DO - LOG IN SCRIPT

let loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", event => {
    console.log("Sending loginForm...", loginForm.elements.username.value, loginForm.elements.password.value);
    let data = {
        username: loginForm.elements.username.value,
        password: loginForm.elements.password.value
    };
    fetch("/api/login.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(response => {
            //save response objects in local storage;
        });

    event.preventDefault();
});
// TO DO - REGISTRATION SCRIPT; Landing page and Register new request
let registrationForm = document.querySelector("#registration-form");
loginForm.addEventListener("submit", event => {
    console.log("Sending registrationForm...", registrationForm.elements.username.value, registrationForm.elements.password.value);
    let data = {
        username: registrationForm.elements.username.value,
        email: registrationForm.elements.email.value,
        password: registrationForm.elements.password.value
    };
    fetch("/api/registraion/new.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(response => {
            //save response objects in local storage;
        });

    event.preventDefault();
});

// Landing
function loadRegistration() {
    console.log("clicked");
    // TO DO - FETCH REQUEST FOR /api/registration
    fetch("/api/registration")
        .then(res => {
            console.log(res);
        });
}

// Register new
// TO DO - PROFILE SCRIPT
