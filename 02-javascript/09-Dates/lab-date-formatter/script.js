const currentDate = new Date();
const currentDateFormat = `Current Date and Time: ${currentDate}`;
console.log(currentDateFormat);

function formatDateMMDDYYYY(date) {
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  return `Formatted Date (MM/DD/YYYY): ${month}/${dayOfMonth}/${year}`;
}

function formatDateLong(date) {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDateLong = date.toLocaleDateString("en-US", options);
  return `Formatted Date (Month Day, Year): ${formattedDateLong}`;
}

console.log(formatDateMMDDYYYY(currentDate));
console.log(formatDateLong(currentDate));
