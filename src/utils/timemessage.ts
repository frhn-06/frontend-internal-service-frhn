import Convert from "./convert.";


const isSameDate = (date1: Date, date2: Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};


const setTimeMessage = (date: string) => {
    const now = new Date();
    const data = new Date(date);


    if (isSameDate(data, now)) {
        return Convert.formatHours(date);
    }



    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (isSameDate(data, yesterday)) {
        return `Kemarin, ${Convert.formatHours(date)}`;
    }


    const selisihHari = Math.floor(
        (now.getTime() - data.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (selisihHari < 8) {
        return `${Convert.formatDays(date)}, ${Convert.formatHours(date)}`;
    }
    


    if (data.getFullYear() === now.getFullYear()) {
        return `${Convert.formatDateMonth(date)}, ${Convert.formatHours(date)}`;
    }


    return `${Convert.formatYears(date)}, ${Convert.formatDateMonth(date)}, ${Convert.formatHours(date)}`;
};


export default setTimeMessage;