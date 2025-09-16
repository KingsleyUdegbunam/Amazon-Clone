function isWeekend(date) {
  if (date.format("dddd") === "Saturday" || date.format("dddd") === "Sunday") {
    console.log("it's " + date.format("dddd"));
  } else {
    console.log("Not the weekend");
  }
}

export default isWeekend;
