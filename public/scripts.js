/*********************************
 * 
 * This script file will control:
 *      -Client requests
 *      -Maintain token
 *      -TODO // ADD MORE
 * 
 */

// TO DO - LOG IN SCRIPT

let form = document.querySelector("#login-form");
form.addEventListener("submit", event => {
    console.log("Sending form...", form.elements.username.value, form.elements.password.value);
    let data = {
        username: form.elements.username.value,
        password: form.elements.password.value
    };
    fetch("/api/registration/new.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(response => {
            console.log(response);
        });

    event.preventDefault();
})
// TO DO - REGISTRATION SCRIPT; Landing page and Register new request

// Landing
function loadRegistration() {
    // TO DO - FETCH REQUEST FOR /api/registration
    fetch()
}

// Register new
// TO DO - PROFILE SCRIPT
