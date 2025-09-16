import dayjs from "https://unpkg.com/dayjs/esm/index.js";
import isSatSun from "./scripts/dateFunctions.js";

let today = dayjs();

function formatDate(day) {
  const newDay = day.format("MMMM D");

  return newDay;
}

const todayForrmatted = formatDate(today);
console.log(todayForrmatted);

const aMonthTime = today.add(1, "months");
console.log(aMonthTime.format("MMMM D"));

const aMonthBefore = today.subtract(1, "months");
console.log(formatDate(aMonthBefore));

console.log(today.format("dddd"));

isSatSun(aMonthTime);
