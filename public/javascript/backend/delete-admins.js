const form = document.getElementById("delete_user_form")
const username = document.getElementById("username")
const password = document.getElementById("password")
const userUsername = document.getElementById("currentUserUsername");

const box_error = document.getElementById("box-error")
const alert_box = document.createElement("div");
alert_box.classList.add("alert");
alert_box.classList.add("alert-danger");
alert_box.setAttribute("role", "alert");
alert_box.setAttribute("dir", "ltr");


form.onsubmit = async (e) => {
    e.preventDefault();
    if (box_error.contains(alert_box)) {
        alert_box.textContent = "";
        box_error.removeChild(alert_box);
    }

    fetch("/dashboard/admins/delete", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            userUsername: userUsername.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
        .then(data => {
            if (data.message) {
                alert_box.textContent = data.message;
                box_error.appendChild(alert_box);
            } else {
                console.log(data.message);
                window.location.replace("/dashboard")
            }
        })
        .catch(error => {
            console.log(error.message);
            alert_box.textContent = error.message;
            box_error.appendChild(alert_box);
        });
}