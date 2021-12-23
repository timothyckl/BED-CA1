module.exports = {
    checkDates: (startDate, endDate, callback) => {
        const splitDate = (date) => {
            return date.split("-");
        };

        const [startYear] = splitDate(startDate);
        const [endYear] = splitDate(endDate);

        if (startYear > endYear) return callback(Error('Start date is greater than end date.'));
        else return callback(null);
    }
};