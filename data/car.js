class Car {
  #brand;
  #model;
  speed = 0;
  minSpeed = 0;
  maxSpeed = 200;
  isTrunkOpen;
  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }
  displayInfo() {
    if (this.acceleration) {
      /*  console.log(
        `${this.#brand} ${this.#model} ${this.speed}km/h ${
          this.acceleration
        }m/s`
      ); */
      return;
    }
    /*    console.log(
      `${this.#brand} ${this.#model} ${this.speed}km/h ${this.isTrunkOpen}`
    ); */
  }

  go() {
    if (this.speed + 5 <= this.maxSpeed) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed - 5 >= this.minSpeed) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (!this.isTrunkOpen && this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    if (this.isTrunkOpen && this.speed === 0) {
      this.isTrunkOpen = false;
    }
  }
}

const car1 = new Car("Toyota", "Corolla");
const tesla = new Car("Tesla", "3");

car1.displayInfo();

car1.go();
car1.displayInfo();
car1.go();
car1.displayInfo();
car1.go();
car1.displayInfo();
car1.brake();
car1.displayInfo();
car1.brake();
car1.displayInfo();
car1.brake();
car1.displayInfo();
car1.brake();
car1.displayInfo();
car1.openTrunk();
car1.closeTrunk();
car1.openTrunk();

//car1.brake();
car1.displayInfo();

//console.log(car1);
//console.log(tesla);

class RaceCar extends Car {
  acceleration;

  constructor(brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration;
  }

  go() {
    if (this.speed <= this.maxSpeed) {
      this.speed += this.acceleration;
    }
  }
  openTrunk() {
    this.isTrunkOpen = "";
  }

  closeTrunk() {
    this.isTrunkOpen = "";
  }
}

const lastestCar = new RaceCar("McLaren", "F1", 20);

lastestCar.go();
lastestCar.go();

//console.log(lastestCar);
lastestCar.displayInfo();
