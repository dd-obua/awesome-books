export const displayTime = () => {
  const currentDate = new Date();
  // prettier-ignore
  const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
  const monthIndex = currentDate.getMonth();
  const dayOfMonth = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const standardHours = hours < 13 ? hours : hours % 12;
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const time = `${standardHours}:${minutes}:${seconds}`;
  const amOrPm = hours < 13 ? 'am' : 'pm';
  return `${months[monthIndex]} ${dayOfMonth}th ${year}, ${time} ${amOrPm}`;
};
