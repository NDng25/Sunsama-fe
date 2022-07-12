export function FormatDateToAdd(dateTask) {
    let date = dateTask.getDate();
    let month = dateTask.getMonth()+1;
    let year = dateTask.getFullYear();
    if(date<10) date = '0'+date;
    if(month<10) month = '0'+month;
    return date+'-'+month+'-'+year;
}