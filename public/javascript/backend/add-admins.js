const form = document.getElementById("registeration_form")
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const username = document.getElementById("username")
const password = document.getElementById("password")
const repeatPassword = document.getElementById("repeatPassword")
const position = document.getElementById("position")
const permissions = document.getElementById("permissions")
const image = document.getElementById("image")


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

    const formData = new FormData();
    formData.append("firstName", firstName.value)
    formData.append("lastName", lastName.value)
    formData.append("username", username.value)
    formData.append("password", password.value)
    formData.append("repeat_password", repeatPassword.value)
    formData.append("position", position.value)
    formData.append("permission", permissions.value)
    formData.append("image", image.files[0])

    fetch("/dashboard/admins/register", {
        method: "POST",
        body: formData
    }).then((response) => response.json())
        .then(data => {
            if (data.message) {
                alert_box.textContent = data.message;
                box_error.appendChild(alert_box);
            } else {
                window.location.assign("/dashboard")
            }
        })
        .catch(error => {
            alert_box.textContent = error.message;
            box_error.appendChild(alert_box);
        });
}