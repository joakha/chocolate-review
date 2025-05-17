const getFormattedFinnishDate = (isoDate: Date) => {
    const dateObject = new Date(isoDate);

    const date = new Intl.DateTimeFormat('fi-FI', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'Europe/Helsinki'
    }).format(dateObject);

    const time = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Europe/Helsinki'
    }).format(dateObject);

    const combination = `${date} ${time}`;

    return combination;
}

export {
    getFormattedFinnishDate
}