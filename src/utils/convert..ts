const Convert = {
    dateToLocal: (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }) + " WIB";
    }
}


export default Convert;