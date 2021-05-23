console.log("hello");
const balanceEl = document.querySelector(".balance span");
const stockList = document.querySelector(".stocks .list");
const companyList = [
  { apple: "AAPL" },
  { amazon: "AMZN" },
  { microsoft: "MSFT" },
  { santanderUK: "SAN" },
  { tesla: "TSLA" },
];
const backend = "http://localhost:3000";
let companyShareName;
let companyShareValue;
console.log(balanceEl);
let getbalance = async () => {
  await fetch(`${backend}/userbalance/1`)
    .then((response) => response.json())
    .then((data) => (balanceEl.innerText = data));
};
getbalance();
companyList.forEach((company) => {
  const companyLi = document.createElement("li");
  companyLi.classList.add("company");
  const companyValue = Object.values(company);
  const companyName = Object.keys(company);
  // companyLi.setAttribute('name', );
  companyLi.innerHTML = ` <h3 class="stockName">${companyName}</h3>
  <h2 class="value" name="${companyValue}">
    Awaiting Value...
  </h2>
  <form action="">
    <input type="text">
      <div class="buttons">
        <button class="buy" name="buy" value="buy" type="submit">buy</button>
        <button class="sell" name="sell" value="sell"type="submit" >sell</button>

      </div>
      <div class="total">Total: <span>0</span></div>
  </form>`;
  stockList.appendChild(companyLi);
  // console.log(stockValue);
});

const companies = [...document.querySelectorAll(".company h2")];
companies.forEach((company) => {
  const name = company.getAttribute("name");
  console.log(name);
  const companyfetch = setInterval(async () => {
    try {
      await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${name}&token=sandbox_c2j6s8qad3ib3m9cdrq0`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.c === "undefined") return;
          company.innerHTML = `
          ${data.c}
        `;
        });
    } catch (err) {
      console.log(err.message);
    }
  }, 5000);
});
// const buyButtons = document.querySelectorAll(".buy");
// buybuttons.forEach((buy) => {
stockList.addEventListener("click", async (event) => {
  event.preventDefault();
  if (event.target.matches(".buy")) {
    const companyEl = event.target.parentNode.parentNode.parentNode;
    let inputValue = event.target.parentNode.parentNode.querySelector("input");
    const totalEl =
      event.target.parentNode.parentNode.querySelector(".total span");
    companyShareName = companyEl.querySelector("h2").getAttribute("name");
    companyShareValue = parseFloat(companyEl.querySelector("h2").innerText);
    total = inputValue.value * companyShareValue;
    console.log(
      "click",
      companyShareName,
      companyShareValue,
      inputValue.value,
      "total:",
      total
    );
    inputValue.value = "";
    totalEl.innerText = total;
    const currentBalance = parseInt(balanceEl.innerText);
    if (currentBalance >= total) {
      newBalance = currentBalance - total;
      const data = {balance: newBalance};
      const resp = await fetch("http://localhost:3000/userbalance/1", {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      // .then(response => response.text());;
      // console.log(resp);
    }
    getbalance()
  }
});
// });
