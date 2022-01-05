export const getMonth = (month = new Date().getMonth() +1) => new Date(`${month}/1/2021`).toLocaleString('default', { month: 'long' });

export const getMonthDays = (month, year) => new Date(year, month, 0).getDate();

export const convertTimeToAmPm = (d) => {
    const fromBreakDown = d.from.toFixed(2).toString().split('.');
    const toBreakDown = d.to.toFixed(2).toString().split('.');

    return {
        from: (fromBreakDown[0] > 12 ? fromBreakDown[0] -12:(fromBreakDown[0] == 0 ? '12':fromBreakDown[0])) + `:${fromBreakDown[1]}` + (fromBreakDown[0] < 12 ? 'AM':'PM'),
        to: (toBreakDown[0] > 12 ? toBreakDown[0] -12:(toBreakDown[0] == 0 ? '12':toBreakDown[0])) + `:${toBreakDown[1]}` + (toBreakDown[0] < 12 ? 'AM':'PM'),
    }
};
