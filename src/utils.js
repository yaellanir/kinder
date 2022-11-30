function getToday() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
}
function getTomorrowStart() {
  const date = new Date();
  const tomorrow = new Date(date.setDate(date.getDate() - date.getDay() + 1));
  tomorrow.setUTCHours(0, 0, 0, 0);
  return tomorrow;
}
export function getDateTomorrow() {
  const date = getToday();
  return new Date(date.setDate(date.getDate() - date.getDay() + 1));
}
export function getLastDayOfWeek() {
  const today = getToday();
  const lastDayOfWeek = new Date(
    new Date(today.setDate(today.getDate() - today.getDay() + 6))
  );
  lastDayOfWeek.setUTCHours(23, 59, 59, 999);
  return lastDayOfWeek;
}
export function getLastDayOfMonth() {
  const date = getToday();
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0);
}

function isThisWeekend(eventDate) {
  const date = new Date();
  const firstDayOfWeekend = new Date(
    date.setDate(date.getDate() - date.getDay() + 5)
  );
  firstDayOfWeekend.setUTCHours(0, 0, 0, 0);
  const lastDayOfWeek = getLastDayOfWeek();
  return dateInRange(firstDayOfWeekend, lastDayOfWeek, eventDate);
}

export function isEventExpired(eventDate) {
  const date = getToday();
  eventDate = new Date(eventDate);
  return eventDate > new Date(date.setDate(date.getDate() - date.getDay() - 1));
}

function dateInRange(start, end, eventDate) {
  eventDate = new Date(eventDate);
  console.log({ start, end, eventDate });
  if (eventDate >= start && eventDate <= end) {
    return true;
  } else {
    return false;
  }
}

export function isDateInRange(rangeTarget, eventDate) {
  switch (rangeTarget) {
    case "": {
      return isEventExpired(eventDate);
    }
    case "today": {
      const start = getToday();
      const end = getTomorrowStart();
      return dateInRange(start, end, eventDate);
    }
    case "tomorrow": {
      const start = getDateTomorrow();
      start.setUTCHours(0, 0, 0, 0);
      const end = getDateTomorrow();
      end.setUTCHours(23, 59, 59, 999);
      return dateInRange(start, end, eventDate);
    }
    case "week": {
      const start = getToday();
      const end = getLastDayOfWeek();
      return dateInRange(start, end, eventDate);
    }
    case "month": {
      const start = getToday();
      const end = getLastDayOfMonth();
      return dateInRange(start, end, eventDate);
    }
    case "weekend": {
      return isThisWeekend(eventDate);
    }
    default: {
      return true;
    }
  }
}
