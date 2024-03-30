const loginForm = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const box_error = document.getElementById("box-error")
const alert_box = document.createElement("div");
alert_box.classList.add("alert");
alert_box.classList.add("alert-danger");
alert_box.setAttribute("role", "alert");
alert_box.setAttribute("dir", "ltr");

loginForm.onsubmit = async (e) => {
    e.preventDefault();

    if (box_error.contains(alert_box)) {
        alert_box.textContent = "";
        box_error.removeChild(alert_box);
    }

    const loginData = JSON.stringify({
        username: username.value,
        password: password.value
    })


    fetch("/auth/login", {
        method: "POST",
        body: loginData,
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
        .then(data => {
            if (data.message) {
                alert_box.textContent = data.message;
                box_error.appendChild(alert_box);
            } else {
                window.location.assign("/dashboard/")
            }
        })
        .catch(error => console.error('there is an Error:', error));
}