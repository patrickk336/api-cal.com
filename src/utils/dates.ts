export const getStartDate = function () {
    const now = new Date();
    const startDate = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); 

    const start_date = `${startDate.getUTCFullYear()}-${(startDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${startDate.getUTCDate().toString().padStart(2, '0')}`;

    return start_date;
}

export const getEndDate = function () {
    const now = new Date();
    const endDate = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000); 

    const end_date = `${endDate.getUTCFullYear()}-${(endDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${endDate.getUTCDate().toString().padStart(2, '0')}`;

    return end_date;
}