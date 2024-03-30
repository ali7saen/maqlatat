const form = document.getElementById("form")
const title = document.getElementById("title")
const caption = document.getElementById("caption")
const mainText = document.getElementById("mainText")
const keyWordsField = document.getElementById("keyWords")
const fullUserName = document.getElementById("fullUserName");
const Image = document.getElementById("image")

const box_error = document.getElementById("box-error")
const alert_box = document.createElement("div");
alert_box.classList.add("alert");
alert_box.classList.add("alert-danger");
alert_box.setAttribute("role", "alert");
alert_box.setAttribute("dir", "rtl");

form.onsubmit = async (e) => {
    e.preventDefault();
    
    // validation
    const errors = []

    if (title.value == "") {
        errors.push("عنوان الخبر غير مكتوب");
    } else {
        if (title.value.length > 150) {
            errors.push(`طول العنوان: ${title.value.length} الطول المسموح اكبر من 10 واصغر من 150 `);
        } else if (title.value.length <= 10) {
            errors.push(`طول العنوان: ${title.value.length} الطول المسموح اكبر من 10 واصغر من 150`);
        }
    }

    if (caption.value.length == "") {
        errors.push("كابشن الخبر غير مكتوب");
    } else {
        if (caption.value.length > 350) {
            errors.push(`طول الكابشن: ${caption.value.length} الطول المسموح اكبر من 10 واصغر من 350 `);
        } else if (caption.value.length <= 10) {
            errors.push(`طول الكابشن: ${caption.value.length} الطول المسموح اكبر من 10 واصغر من 350`);
        }
    }

    if (mainText.value == "") {
        errors.push("نص الخبر غير مكتوب");
    } else {
        if (mainText.value.length > 2000) {
            errors.push(`طول نص الخبر: ${mainText.value.length} الطول المسموح اكبر من 10 واصغر من 2000 `);
        } else if (mainText.value.length <= 10) {
            errors.push(`طول نص الخبر: ${mainText.value.length} الطول المسموح اكبر من 10 واصغر من 2000`);
        }
    }

    if (keyWords.value == "") {
        errors.push("الكلمات المفتاحية غير مكتوبة");
    }

    let totalSize = 0;
    for (const file of Images.files) {
        if (file.size >= 3145728) {
            errors.push(`الصورة (${file.name}) حجمها اكثر من 3MB`)
        } else {
            totalSize = totalSize + file.size
        }
    }

    if (totalSize > 1024 * 1024 * 30) {
        errors.push("الحجم الكلي للصور كبير جدا، اكثر من 30MB")
    }

    if (errors.length > 0) {
        alert_box.textContent = errors[0];
        box_error.appendChild(alert_box);
    } else {

        const spinner = document.getElementById("spinner");
        spinner.style.display = "flex";

        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("caption", caption.value);
        formData.append("mainText", mainText.value);
        const keyWords = getKeyWords(keyWordsField.value);
        formData.append("keyWords", keyWords);
        formData.append("publisher", fullUserName.innerText)

        for (const image of Images.files) {
            formData.append("files", image);
        }
        fetch("/dashboard/news/add", {
            method: "POST",
            body: formData
        }).then((response) => response.json())
            .then(data => {
                if (data.message) {
                    alert_box.textContent = data.message;
                    box_error.appendChild(alert_box);
                } else {
                    window.location.replace("/dashboard");
                }
            })
            .catch(error => console.error('there is an Error:', error));
    }
}


function getKeyWords(keyWords) {
    let arrayOfKeyWords = keyWords.split("/")
    let result = {};
    for (let i = 0; i < arrayOfKeyWords.length; i++) {
        result[`keyWord${i}`] = arrayOfKeyWords[i].trim();
    }
    return JSON.stringify(result);
}



