import moment from "moment";

export const validateExpiry = (value: string, currentDate: Date = new Date()) => {
    const date = moment(value, "MM/YY", true);
    const max = date.add('months', 1).date(1).subtract('days', 1);
    return date.isValid() && moment(currentDate).isBefore(max);
}