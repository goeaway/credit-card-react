export const validate = (number: string) : boolean => {
    if(!number || number.length < 13 || number.length > 19){
        return false;
    } 

    // create an array of ints from the string
    const array = number.split("").reverse().map(n => parseInt(n));

    if(array.some(n => isNaN(n))) {
        return false;
    }

    // first digit is the check (since we reversed the number)
    // take it out now
    const checkDigit = array.splice(0, 1)[0];

    // for every even indexed number in the array, multiply it by 2, if the result of that is greater than nine,
    // minus 9 from the result, sum result with non multiplied numbers too
    const sum = array.reduce((acc, cur, index) =>
        index % 2 == 0 ? acc + (cur * 2 > 9 ? cur * 2 - 9 : cur * 2) : acc + cur, 0);

    // add the sum and check and then get the modulus of 10, if result is zero we have a valid number    
    return (sum + checkDigit) % 10 === 0;
}

export const getCardProvider = (number: string) : "none" | "visa" | "mastercard" | "amex" => {
    if(!number) {
        return "none";
    }

    const trimmed = number.replace(/\s/g, "");

    const lookup = {
        "visa": ["4"],
        "mastercard": ["51", "52", "53", "54", "55"],
        "amex": ["34", "37"]
    };

    return  lookup.visa.some(v => trimmed.indexOf(v) === 0) ? "visa" :
            lookup.mastercard.some(m => trimmed.indexOf(m) === 0) ? "mastercard" : 
            lookup.amex.some(a => trimmed.indexOf(a) === 0) ? "amex" : 
            "none";
}