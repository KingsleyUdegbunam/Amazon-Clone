import "./../../data/products.js";
import { Appliance, Clothing, Product } from "./../../data/products.js";

describe("Test Suite: Product Class", () => {
  let plates;

  beforeEach(() => {
    plates = new Product({
      id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      image: "images/products/6-piece-white-dinner-plate-set.jpg",
      name: "6 Piece White Dinner Plate Set",
      rating: {
        stars: 4,
        count: 37,
      },
      priceCents: 2067,
      keywords: ["plates", "kitchen", "dining"],
    });
  });
  it("Give the instance(s) the generic product properties", () => {
    expect(plates.name).toEqual("6 Piece White Dinner Plate Set");
    expect(plates.rating.stars).toEqual(4);
  });

  it("Checks the methods functionality", () => {
    expect(plates.getPrice()).toEqual("$20.67");
    expect(plates.getStarsUrl()).toEqual("images/ratings/rating-40.png");
  });
});

describe("Test Suite: Clothing Class, an extension of class Product", () => {
  let dress;

  beforeEach(() => {
    dress = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });

  it("crosschecks the properties (inherited and new)", () => {
    expect(dress.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(dress.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });

  it("checks the Class methods", () => {
    expect(dress.extraInfoHTML()).toEqual(
      "<a href='images/clothing-size-chart.png' target='_blank'>Size chart</a>"
    );
  });
});
