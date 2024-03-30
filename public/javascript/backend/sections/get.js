function showConfirmBox(id) {
    const confirmBox = `<div id="confirm-box" class="confirm-box">
        <div class="dialog-box">
            <div class="alert alert-danger" role="alert">
                هل انت متأكد من انك تريد حذف القسم !!
            </div>
            <div class="btns">
                <button onclick="confirmAndDeleteNews('${id}')" type="button" class="btn btn-danger">حذف</button>
                <button onclick="cancelAndBack()" type="button" class="btn btn-secondary">الغاء</button>
            </div>
        </div>
    </div>` ;
    document.body.innerHTML += confirmBox
}

const confirmAndDeleteNews = async (id) => {
    fetch(`/sections/manage/delete/${id}`, {
        method: "GET"
    }).then(res => res.json())
        .then(data => {
            if (!data.message) {
                window.location.reload();
            } else {
                console.log(data.message);
            }
        })
}

const cancelAndBack = () => {
    const confirmBox = document.getElementById("confirm-box");
    document.body.removeChild(confirmBox);
}