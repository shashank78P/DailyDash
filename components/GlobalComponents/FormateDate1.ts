// given a Date with timeStramp
// It returns :
// if given date ius today it returns time in AM ot PM
// else if its yestersday
// else return by formating given date 

type ExtractDateParamentersDto = {
    givenDate: number,
    givenMonth: number,
    givenYear: number,
    givenHours: number,
    givenMinute: number,
    givenSecond: number,
}

type getHumanReadableDateDiffDto = {
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
}
export function getTimeWithAMorPMForMeet(date: string): string {
    // const givenDate = new Date(date)
    console.log("givenDate")
    console.log(date)

    // console.log(givenDate)
    // let second = givenDate?.getSeconds()
    
    date = date?.split("T")[1]
    let hour = Number(date?.split(":")[0])
    let minute = Number(date?.split(":")[1])
    let AM_PM = "AM"
    if (hour >= 12 && hour < 24) {
        AM_PM = "PM"
    }
    return `${String(hour % 12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${String(AM_PM).padStart(2, '0')}`
}

export function getTimeWithAMorPM(date: string): string {
    const givenDate = new Date(date)
    console.log("givenDate")
    console.log(date)
    
    console.log(givenDate)
    let hour = givenDate?.getHours()
    let second = givenDate?.getSeconds()
    let minute = givenDate?.getMinutes()
    let AM_PM = "AM"
    if (hour >= 12 && hour < 24) {
        AM_PM = "PM"
    }
    return `${String(hour % 12).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')} ${String(AM_PM).padStart(2, '0')}`
}

export function FormateDate1(date: Date) {
    let today = new Date()
    let currentDate = today.getDate()
    let currentMonth = today.getMonth() + 1
    let currentYear = today.getFullYear()

    const { givenDate, givenMonth, givenYear } = ExtractDateParamenters(date)
    date = new Date(date)


    if (givenDate === currentDate && givenMonth === currentMonth && givenYear === currentYear) {

        return getTimeWithAMorPM(date.toString())
    } else if (givenDate + 1 === currentDate && givenMonth === currentMonth && givenYear === currentYear) {
        return "Yesterday"
    }
    else {
        return `${givenDate}/${givenMonth}/${givenYear}`
    }
}

export function ExtractDateParamenters(date: Date): ExtractDateParamentersDto {
    date = new Date(date)
    let givenMinute = date.getMinutes()
    let givenSecond = date.getSeconds()
    let givenHours = date.getHours()
    let givenDate = date.getDate()
    let givenMonth = date.getMonth() + 1
    let givenYear = date.getFullYear()
    return { givenDate, givenMonth, givenYear, givenHours, givenMinute, givenSecond }
}

export const getTime = (createdAt: string) => {
    let date = new Date(createdAt)
    return `${String(date?.getHours()).padStart(2, '0')}:${String(date?.getMinutes()).padStart(2, '0')}`
}

// yyyy-mm-ddThr:min
export function dateFormate(date: Date) {
    const { givenDate, givenHours, givenMinute, givenMonth, givenSecond, givenYear } = ExtractDateParamenters(date)
    const formattedHours = String(givenHours).padStart(2, '0');
    const formattedMinute = String(givenMinute).padStart(2, '0');
    const formattedmonth = String(givenHours).padStart(2, '0');
    const formattedDate = String(givenMinute).padStart(2, '0');
    return `${givenYear}-${formattedmonth}-${formattedDate}T${formattedHours}:${formattedMinute}`
}

function getHumanReadableDateDiff(dateDiff: number): getHumanReadableDateDiffDto {
    const seconds = Math.floor(dateDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    const sec = seconds % 60;
    const min = minutes % 60;
    const hrs = hours % 24;
    const day = days % 30;
    const month = months % 12;

    return {
        years,
        months: month,
        days: day,
        hours: hrs,
        minutes: min,
        seconds: sec
    };
}

export function timeDiffWithCurrentDate(date: Date) {
    let today: any = new Date()
    let givenDate: any = new Date(date)

    if (today >= givenDate) {
        let dateDiff: number = Math.abs(givenDate - today)
        const result = getHumanReadableDateDiff(dateDiff)
        if (result?.years > 0) {
            return `${Math.abs(result?.years)} years ago`
        }
        if (result?.years == 0 && result?.months > 0) {
            return `${Math.abs(result?.months)} mon ago`
        }
        else if (result?.months == 0 && result?.days > 6) {
            return `${Math.floor(result?.days / 7)} weeks ago`
        }
        else if (result?.months == 0 && result?.days > 0 && result?.days <= 6) {
            return `${result?.days} days ago`
        }
        else if (result?.months == 0 && result?.days == 0 && result?.hours > 0) {
            return `${Math.floor(result?.hours)} hrs ago`
        }
        else if (result?.months == 0 && result?.days == 0 && result?.hours == 0 && result?.minutes > 0) {
            return `${Math.floor(result?.minutes)} min ago`
        }
        else if (result?.months == 0 && result?.days == 0 && result?.hours == 0 && result?.minutes == 0 && result?.seconds > 0) {
            return `${Math.floor(result?.minutes)} sec ago`
        }
        else if (result?.months == 0 && result?.days == 0 && result?.hours == 0 && result?.minutes == 0 && result?.seconds == 0) {
            return `now`
        }
    }
    else {
        const { givenDate, givenMonth, givenHours, givenMinute, givenSecond, givenYear } = ExtractDateParamenters(new Date(date))
        return `${givenDate}/${givenMonth}/${givenYear}-${getTimeWithAMorPM(date?.toString())}`
    }

}

export function isGivenDateTimeIsInLimit(date: Date, meetingLength: { min?: number, hr?: number, day?: number }): boolean {
    let currentDate = new Date()
    let givenDate = new Date(date)

    if (givenDate <= currentDate) {
        if (meetingLength?.min) {
            String(givenDate.setMinutes(Number(givenDate.getMinutes()) + 45)).padStart(2, '0')
        }
        else if (meetingLength?.hr) {
            String(givenDate.setHours(givenDate.getHours() + meetingLength?.hr)).padStart(2, '0')
        }

        else if (meetingLength?.day) {
            String(givenDate.setDate(givenDate.getDate() + meetingLength?.day)).padStart(2, '0')
        }
        else {
            return false
        }
        if (givenDate <= currentDate) {
            return true
        }
        else {
            return false
        }
    } else {
        return false
    }

}