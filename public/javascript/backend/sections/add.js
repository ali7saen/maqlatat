const form = document.getElementById("form");
const title = document.getElementById("title");
const fullUserName = document.getElementById("fullUserName");

const box_error = document.getElementById("box-error");
const alert_box = document.createElement("div");
alert_box.classList.add("alert");
alert_box.classList.add("alert-danger");
alert_box.setAttribute("role", "alert");
alert_box.setAttribute("dir", "rtl");

form.onsubmit = (e) => {
    e.preventDefault();

    // validation
    const errors = []

    if (title.value == "") {
        errors.push("يجب كتابة عنوان القسم");
    }

    if (errors.length > 0) {
        alert_box.textContent = errors[0];
        box_error.appendChild(alert_box);
    } else {
        const spinner = document.getElementById("spinner");
        spinner.style.display = "flex";
        const formData = JSON.stringify({
            title: title.value,
            articleNumbers: "0",
            publisher: fullUserName.innerText
        });

        fetch("/sections/manage/add", {
            method: "POST",
            body: formData,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then(response => response.json())
            .then(data => {
                if (data.message) {
                    spinner.style.display = "none";
                    alert_box.textContent = data.message;
                    box_error.appendChild(alert_box);
                } else {
                    window.location.replace("/dashboard");
                }
            })
            .catch(error => console.error('there is an Error:', error.message));
    }
}