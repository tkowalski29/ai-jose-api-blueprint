export const CurrentDate = () => {
  const date = new Date();

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekday = weekdays[date.getDay()];

  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-based in JS
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${weekday}, ${month}/${day}/${year} ${hours}:${minutes}`;
};
