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
    },




    formatHours: (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleTimeString("id-ID", {
            minute: "2-digit",
            hour: "2-digit"
        })
    },

    
    formatDays: (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleString("id-ID", {
            weekday: "long"
        })
    },

    formatDateMonth: (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleString("id-ID", {
            day: "numeric",
            month: "short"
        })
    },
    

    formatMonth: (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleString("id-ID", {
            month: "long"
        })
    },

    formatYears: (date: string) => {
        const newDate = new Date(date); 
        return newDate.toLocaleString("id-ID", {
            year: "numeric"
        })
    }
}


export default Convert;