export const parseISO8601Date = (dateString?: string) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = dateString ? new Date(dateString) : new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: userTimeZone, 
  };

  return new Intl.DateTimeFormat('en', options).format(date);
}

export const standardDateConvertion = (value?: string, hours = false) => {
  const date = value ? new Date(value) : new Date();
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();

  day = day.length === 1 ? "0" + day : day;
  month = month.length === 1 ? "0" + month : month;

  if (hours) {
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${month}/${day}/${year} at ${hour}:${minutes < 10 ? "0" + minutes : minutes
      }`;
  }

  return `${month}/${day}/${year}`;
}