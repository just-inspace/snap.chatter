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
        .then(response => {
            if (!response.ok) {
                throw Error (response.statusText);
            }
            window.location = "/api/messages";
            //save response objects in local storage;
        })
        .catch(error => {
            console.log(error);
            // message username/pass not found
        });

    event.preventDefault();
});