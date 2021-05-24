console.log("hello");
const balanceEl = document.querySelector(".balance p span");
const usernameHeader = document.querySelector(".balance .playerName span");
let currentUserId;
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
    .then((data) => {
      balanceEl.innerText = data.balance;
      usernameHeader.innerText = data.firstName;
      currentUserId = data.id;
    });
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
      <div class="totals">
      <div class="totalOwned">Shares Owned:<span>value will be updated on sell button press</span></div>
      <div class="total">Total transaction Value: <span>0</span></div>
      </div>
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
    const totalEl = event.target.parentNode.parentNode.querySelector(
      ".totals .total span"
    );
    const totalSharesOwnedEl = event.target.parentNode.parentNode.querySelector(
      ".totals .totalOwned span"
    );
    companyShareName = companyEl.querySelector("h2").getAttribute("name");
    companyShareValue = parseFloat(companyEl.querySelector("h2").innerText);
    total = inputValue.value * companyShareValue;

    let sharesOwned = [];
    let sharesSold = [];
    const userTransactions = await fetch(
      `http://localhost:3000/transactions/${currentUserId}`
    ).then((response) => response.json());
    userTransactions.forEach((transaction) => {
      selectedShareName = transaction.shareName;
      if (
        selectedShareName === companyShareName &&
        transaction.sharePriceOnPurchase
      ) {
        sharesOwned.push(transaction.shareAmmount);
      }
      if (
        selectedShareName === companyShareName &&
        transaction.sharePriceOnSell
      ) {
        sharesSold.push(transaction.shareAmmount);
      }
    });
    totalSharesOwned = sharesOwned.reduce((a, b) => a + b, 0);
    totalSharesSold = sharesSold.reduce((a, b) => a + b, 0);
    const actualSharesStillOwned = totalSharesOwned - totalSharesSold;
    console.log(totalSharesOwned, totalSharesSold, actualSharesStillOwned);
    totalSharesOwnedEl.innerText = actualSharesStillOwned;
    totalEl.innerText = total;
    const currentBalance = parseInt(balanceEl.innerText);
    if (currentBalance >= total) {
      newBalance = currentBalance - total;
      const data = { balance: newBalance };
      const resp = await fetch("http://localhost:3000/userbalance/1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => response.text());
      // console.log(resp);
      const transactionData = {
        shareName: companyShareName,
        sharePriceOnPurchase: companyShareValue,
        userId: currentUserId,
        shareAmmount: parseInt(inputValue.value),
      };
      const transaction = await fetch("http://localhost:3000/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
    }
    totalSharesOwnedEl.innerText = actualSharesStillOwned;
    getbalance();
    inputValue.value = "";
  }
  if (event.target.matches(".sell")) {
    const companyEl = event.target.parentNode.parentNode.parentNode;
    let inputValue = event.target.parentNode.parentNode.querySelector("input");
    const totalEl = event.target.parentNode.parentNode.querySelector(
      ".totals .total span"
    );
    const totalSharesOwnedEl = event.target.parentNode.parentNode.querySelector(
      ".totals .totalOwned span"
    );
    companyShareName = companyEl.querySelector("h2").getAttribute("name");
    companyShareValue = parseFloat(companyEl.querySelector("h2").innerText);
    total = inputValue.value * companyShareValue;
    // if share existss
    let sharesOwned = [];
    let sharesSold = [];
    const userTransactions = await fetch(
      `http://localhost:3000/transactions/${currentUserId}`
    ).then((response) => response.json());
    userTransactions.forEach((transaction) => {
      selectedShareName = transaction.shareName;
      if (
        selectedShareName === companyShareName &&
        transaction.sharePriceOnPurchase
      ) {
        sharesOwned.push(transaction.shareAmmount);
      }
      if (
        selectedShareName === companyShareName &&
        transaction.sharePriceOnSell
      ) {
        sharesSold.push(transaction.shareAmmount);
      }
    });
    totalSharesOwned = sharesOwned.reduce((a, b) => a + b, 0);
    totalSharesSold = sharesSold.reduce((a, b) => a + b, 0);
    const actualSharesStillOwned = totalSharesOwned - totalSharesSold;
    console.log(totalSharesOwned, totalSharesSold, actualSharesStillOwned);
    totalSharesOwnedEl.innerText = actualSharesStillOwned;
    // then
    if (actualSharesStillOwned >= inputValue.value) {
      totalEl.innerText = total;
      totalSharesOwnedEl.innerText = actualSharesStillOwned;
      const currentBalance = parseInt(balanceEl.innerText);
      newBalance = currentBalance + total;
      const data = { balance: newBalance };
      const resp = await fetch("http://localhost:3000/userbalance/1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => response.text());
      // console.log(resp);
      const transactionData = {
        shareName: companyShareName,
        sharePriceOnSell: companyShareValue,
        userId: currentUserId,
        shareAmmount: parseInt(inputValue.value),
      };
      const transaction = await fetch("http://localhost:3000/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
      
      getbalance();
      inputValue.value = "";
    }
    totalSharesOwnedEl.innerText = actualSharesStillOwned;
    getbalance();
    inputValue.value = "";
  }
});
// });
