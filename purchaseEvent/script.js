// let price = 3.26;   
// let cid = [
//   ['PENNY', 1.01],
//   ['NICKEL', 2.05],
//   ['DIME', 3.1],
//   ['QUARTER', 4.25],
//   ['ONE', 90],
//   ['FIVE', 55],
//   ['TEN', 20],
//   ['TWENTY', 60],
//   ['ONE HUNDRED', 100]
// ];
// let balance = 0;
// for (let i = 0; i < cid.length; i++) {
//     balance += cid[i][1];
// }
// let allBalance = balance.toFixed(2) - 0;

// let moneyTypes = [
//     {name: 'PENNY', value: 0.01},
//     {name: 'NICKEL', value: 0.05},
//     {name: 'DIME', value: 0.10},
//     {name: 'QUARTER', value: 0.25},
//     {name: 'ONE', value: 1.00},
//     {name: 'FIVE', value: 5.00},
//     {name: 'TEN', value: 10},
//     {name: 'TWENTY', value: 20},
//     {name: 'ONE HUNDRED', value: 100}
// ]
// let inputValue = document.querySelector("#cash");
// let button = document.querySelector("#purchase-btn");
// let charge = document.querySelector("#change-due");

// let drawer = document.querySelector(".cash-drawer-display");
// cid.map(item => {
//     let money = item[1];
//     let name = item[0];
//     drawer.innerHTML += `<p class="cash-drawer-item">${name} - $${money}</p>`;
// })
// const chargeMoney = () => {
//     let money = inputValue.value - 0;
//     if (money < price) {
//         alert("Customer does not have enough money to purchase the item")
//     }
//     else if (money == price) {
//         const message = document.createElement("p");
//         message.textContent = "No change due - customer paid with exact cash";
//         charge.appendChild(message);
//     }
//     else if(money > allBalance){
//         let message = document.createElement("p");
//         message.textContent = "Status: INSUFFICIENT_FUNDS";
//         charge.appendChild(message);
//     }
//     else if (money < allBalance){
//         if (money > price){
//             charge.innerHTML = "";
//             let change = (money - price).toFixed(2) - 0;
//             let exchange = null;
//             let status = document.createElement("p");
//             status.textContent = "Status: OPEN";
//             charge.appendChild(status);
//             for (let i = moneyTypes.length - 1; i >= 0; i--) {
//                 if (change >= moneyTypes[i].value) {
//                     let count = Math.floor(change / moneyTypes[i].value);
//                     exchange = (moneyTypes[i].value * count).toFixed(2) - 0;
//                     if (moneyTypes[i].name == cid[i][0]) {
//                         cid[i][1] = (cid[i][1]-exchange).toFixed(2) - 0;
//                     }
//                     change = (change - exchange).toFixed(2) - 0;
//                     let message = document.createElement("p");
//                     message.textContent = `${moneyTypes[i].name.toUpperCase()}: ${moneyTypes[i].value * count}$`;
//                     charge.appendChild(message);
//                 }
//             }
//             drawer.innerHTML = "";
//             cid.map(item => {
//                 let money = item[1];
//                 let name = item[0];
//                 drawer.innerHTML += `<p class="cash-drawer-item">${name} - $${money}</p>`;
//             })
//         }
//     }

// }
// button.addEventListener("click", chargeMoney)

let price = 3.26;   
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

let balance = 0;
for (let i = 0; i < cid.length; i++) {
    balance += cid[i][1];
}
let allBalance = balance.toFixed(2) - 0;

let moneyTypes = [
    {name: 'PENNY', value: 0.01},
    {name: 'NICKEL', value: 0.05},
    {name: 'DIME', value: 0.10},
    {name: 'QUARTER', value: 0.25},
    {name: 'ONE', value: 1.00},
    {name: 'FIVE', value: 5.00},
    {name: 'TEN', value: 10.00},
    {name: 'TWENTY', value: 20.00},
    {name: 'ONE HUNDRED', value: 100.00}
];

let inputValue = document.querySelector("#cash");
let button = document.querySelector("#purchase-btn");
let charge = document.querySelector("#change-due");

let drawer = document.querySelector(".cash-drawer-display");

// Function to update cash drawer display
const updateDrawerDisplay = () => {
    drawer.innerHTML = "";
    cid.map(item => {
        let money = item[1];
        let name = item[0];
        drawer.innerHTML += `<p class="cash-drawer-item">${name} - $${money.toFixed(2)}</p>`;
    });
};

updateDrawerDisplay();

const chargeMoney = () => {
    let money = parseFloat(inputValue.value);
    if (isNaN(money) || money <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    if (money < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (money === price) {
        const message = document.createElement("p");
        message.textContent = "No change due - customer paid with exact cash";
        charge.innerHTML = "";
        charge.appendChild(message);
    } else {
        charge.innerHTML = "";
        let change = parseFloat((money - price).toFixed(2));
        let exchange = [];
        let statusMessage = "Status: OPEN"; // Default status

        // Check if the drawer has enough balance to provide change
        if (change > allBalance) {
            let message = document.createElement("p");
            message.textContent = "Status: INSUFFICIENT_FUNDS";
            charge.innerHTML = "";
            charge.appendChild(message);
            return;
        }

        // Iterate over money types from largest to smallest
        for (let i = moneyTypes.length - 1; i >= 0; i--) {
            if (change >= moneyTypes[i].value) {
                let availableAmount = cid[i][1];
                let neededAmount = Math.floor(change / moneyTypes[i].value) * moneyTypes[i].value;
                
                if (availableAmount >= neededAmount) {
                    cid[i][1] = parseFloat((availableAmount - neededAmount).toFixed(2));
                    exchange.push([moneyTypes[i].name, neededAmount]);
                    change = parseFloat((change - neededAmount).toFixed(2));
                } else {
                    cid[i][1] = 0;
                    exchange.push([moneyTypes[i].name, availableAmount]);
                    change = parseFloat((change - availableAmount).toFixed(2));
                }
            }
        }

        // Calculate remaining balance in the drawer
        let remainingBalance = cid.reduce((acc, curr) => acc + curr[1], 0);

        // Check if the cash drawer is closed
        if (remainingBalance === 0 || change > 0) {
            statusMessage = "Status: CLOSED";
        }

        // Append status message
        let status = document.createElement("p");
        status.textContent = statusMessage;
        charge.appendChild(status);

        // Display change given back to the customer
        exchange.forEach(([name, amount]) => {
            let message = document.createElement("p");
            message.textContent = `${name.toUpperCase()}: $${amount.toFixed(2)}`;
            charge.appendChild(message);
        });

        // Update the drawer display
        updateDrawerDisplay();
    }
};

button.addEventListener("click", chargeMoney);
