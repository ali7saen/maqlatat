function getFormattedTime(date) {
    const inputDate = new Date(date);

    const optionsTime = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    return inputDate.toLocaleTimeString(undefined, optionsTime);
}


function getFormattedDate(date) {
    const originalDateString = date;
    const originalDate = new Date(originalDateString);
    const formattedDate = originalDate.toISOString().split("T")[0];
    return formattedDate;
}

module.exports = {
    getFormattedTime : getFormattedTime,
    getFormattedDate : getFormattedDate
}