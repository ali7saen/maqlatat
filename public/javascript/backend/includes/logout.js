function confirm_logout() {
    fetch("/dashboard/admins/logout", {
        method: "GET"
    }).then(res => {
        return res.json();
    }).then(data => {
        if (data.message) {
            console.log(data.message);
        } else {
            window.location.replace("/dashboard")
        }
    })
}

function cancel_logout() {
    const confirmBox = document.getElementById("confirm-box");
    document.body.removeChild(confirmBox);
}

function showConfirmBox_logout() {
    const confirmBox = `<div id="confirm-box" class="confirm-box">
<div class="dialog-box">
    <div class="alert alert-danger" role="alert">
        هل انت متأكد من انك تريد تسجيل الخروج ؟
    </div>
    <div class="btns">
        <button onclick="confirm_logout()" type="button" class="btn btn-danger">تسجيل خروج</button>
        <button onclick="cancel_logout()" type="button" class="btn btn-secondary">الغاء</button>
    </div>
</div>
</div>`;
    document.body.innerHTML += confirmBox
}