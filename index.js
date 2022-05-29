// import users from "./users.json" assert { type: "json" };

// console.log(users);

// const data = JSON.parse(users);

const button = document.getElementById("button__table");

const usersFromJson = () => {
  const data = [
    {
      user: "user1",
      email: "aaa@user1.pl",
      uri: "sdfghnbvfghjnbghj/fghj",
      company: "company 123",
    },
    {
      user: "user3",
      email: "aaa@user3.pl",
      uri: "sdfghnbvfghjnbghj/fghj",
      company: "company 999",
    },
    {
      user: "user2",
      email: "aaa@user2.pl",
      uri: "sdfghnbvfgh/fghj",
      company: "company 222",
    },
  ];

  let col = [];
  for (let i = 0; i < data.length; i++) {
    for (let key in data[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  let table = document.createElement("table");

  let tr = table.insertRow(-1);

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  for (let i = 0; i < data.length; i++) {
    tr = table.insertRow(-1);

    for (let j = 0; j < col.length; j++) {
      let tabCell = tr.insertCell(-1);
      tabCell.innerHTML = data[i][col[j]];
    }
  }

  const divShowData = document.getElementById("showData");
  divShowData.innerHTML = "";
  divShowData.appendChild(table);
};

document.addEventListener("DOMContentLoaded", usersFromJson());
