const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  const response = xhr.response;

  console.log(response);
});

xhr.open("GET", "https://supersimplebackend.dev/greeting");
xhr.send();

fetch("https://supersimplebackend.dev/greeting")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(data);
  });

async function getDetails() {
  const response = await fetch("https://supersimplebackend.dev/greeting");

  const data = await response.text();
  console.log(data);
}

//getDetails();

//18d
function postre() {
  fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { name: JSON.stringify("Kingsley") },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
//postre();

async function getAmazon() {
  try {
    const response = await fetch("https://amazon.com");
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error("CORS error. Your request was blocked by the backend.");
  }
}

//getAmazon();

async function throwError() {
  try {
    const response = await fetch("https://supersimplebackend.dev/greeting", {
      method: "POST",
      headers: { "Content-Type": "application.json" },
    });
    if (response.status >= 400) {
      console.log("error");
      console.log(response.status);
      throw response;
    }
    const data = await response.text();

    console.log(data);
  } catch (error) {
    if (error.status === 400) {
      return console.log("Error:", await error.json());
    }
    console.log("Netwok error Please try again later.");
  }
}

throwError();
