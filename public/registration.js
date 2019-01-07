// TO DO - REGISTRATION SCRIPT; Landing page and Register new request
let registrationForm = document.querySelector("#registration-form");

registrationForm.addEventListener("submit", event => {
    console.log("Sending registrationForm...", registrationForm.elements.username.value, registrationForm.elements.password.value);
    let data = {
        username: registrationForm.elements.username.value,
        email: registrationForm.elements.email.value,
        password: registrationForm.elements.password.value
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
            //save response objects in local storage;
            const data = JSON.parse(response);
            localStorage.setItem("username", data.username);
            console.log(localStorage.getItem("username"));
            localStorage.setItem("token", data.token);
        });

});