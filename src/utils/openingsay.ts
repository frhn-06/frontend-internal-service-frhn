const openingSay = () => {
    const date = new Date();
    const hours = date.getHours();
    
    switch(hours) {
        case 3 :
            return "Good morning";
        case 4 :
            return "Good morning";
        case 5 :
            return "Good morning";
        case 6 :
            return "Good morning";
        case 7 :
            return "Good morning";
        case 8 :
            return "Good morning";
        case 9 :
            return "Good morning";
        case 10 :
            return "Good morning";
        case 11 :
            return "Good afternoon";
        case 12 :
            return "Good afternoon";
        case 13 :
            return "Good afternoon";
        case 14 :
            return "Good afternoon";
        case 15 :
            return "Good evening";
        case 16 :
            return "Good evening";
        case 17 :
            return "Good evening";
        case 18 :
            return "Good evening";
        case 19 :
            return "Good night";
        case 20 :
            return "Good night";
        case 21 :
            return "Good night";
        case 22 :
            return "Good night";
        case 23 :
            return "Good night";
        case 0 :
            return "Good night";
        case 1 :
            return "Good night";
        case 2 :
            return "Good night";
        default :
            return "Welcome"
    }
}

export default openingSay;