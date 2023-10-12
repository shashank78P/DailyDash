export function FormateDate1(date: Date) {
    let today = new Date()
    let currentDate = today.getDate()
    let currentMonth = today.getMonth() + 1
    let currentYear = today.getFullYear()

    date = new Date(date)
    let givenDate = date.getDate()
    let givenMonth = date.getMonth() + 1
    let givenYear = date.getFullYear()


    if (givenDate === currentDate && givenMonth === currentMonth && givenYear === currentYear) {
        let hour = date.getHours()
        let AM_PM = "AM"
        if (hour >= 12 && hour < 24) {
            AM_PM = "PM"
        }
        return `${hour % 12}:${date.getMinutes()} ${AM_PM}`
    } else if (givenDate + 1 === currentDate && givenMonth === currentMonth && givenYear === currentYear) {
        return "Yesterday"
    }
    else {
        return `${givenDate}/${givenMonth}/${givenYear}`
    }
}