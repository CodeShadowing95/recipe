export const fetchUser = () => {
    const userInfo = localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")) : localStorage.clear()

    return userInfo;
}

export const transformDate = (date) => {
  const dateParts = date.split('T');
  const [year, month, day] = dateParts[0].split('-');
  const [hour, minute, second] = dateParts[1].split(':');
  const [sec, millisec] = second.split('.');
  const dateObj = new Date(Date.UTC(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
    parseInt(hour, 10),
    parseInt(minute, 10),
    parseInt(sec, 10),
    parseInt(millisec, 10)
  ));

  const now = new Date();
  const timeDiff = now - dateObj;

  const yearsDiff = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 365);
  const monthsDiff = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 30.416);
  const daysDiff = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
  const hoursDiff = Math.floor(timeDiff / 1000 / 60 / 60);
  const minutesDiff = Math.floor(timeDiff / 1000 / 60);
  const secondsDiff = Math.floor(timeDiff / 1000);

  if(yearsDiff > 0) return 'Il y a ' + yearsDiff + ' an(s)';
  if(monthsDiff > 0) return 'Il y a ' + monthsDiff + ' mois';
  if(daysDiff > 0) return 'Il y a ' + daysDiff + ' jour(s)';
  if(hoursDiff > 0) return 'Il y a ' + hoursDiff + ' heure(s)';
  if(minutesDiff > 0) return 'Il y a ' + minutesDiff + ' minute(s)';
  if(secondsDiff > 0) return 'Il y a ' + secondsDiff + ' seconde(s)';
}