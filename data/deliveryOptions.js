import dayjs from "https://unpkg.com/dayjs/esm/index.js";

export function calculateDeliveryDate(deliveryOption) {
  //'today' smartly serves as the day accumulator.
  let today = dayjs();
  const deliveryDays = deliveryOption.deliveryDays;

  let i = deliveryDays;

  while (i > 0) {
    today = today.add(1, "day");
    const formatForCheck = today.format("dddd");

    if (formatForCheck === "Saturday" || formatForCheck === "Sunday") {
      continue;
    }

    i--;
  }
  return today.format("dddd, MMMM D");
}

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

export const deliveryOptions = [
  { id: "1", deliveryDays: 7, priceCents: 0 },
  { id: "2", deliveryDays: 3, priceCents: 499 },
  { id: "3", deliveryDays: 1, priceCents: 999 },
];

console.log(calculateDeliveryDate(deliveryOptions[0]));
