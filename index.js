// import users from "../Users/API/db.json" assert { type: "json" };

// console.log(users);

// const data = JSON.parse(users);

const usersFromJson = () => {
  const data = [
    {
      user: "user1",
      email: "aaa@user1.pl",
      uri: "sdfghnbvfghjnbghj/fghj",
      company: "Company 123",
    },
    {
      user: "user3",
      email: "aaa@user3.pl",
      uri: "sdfghnbvfghjnbghj/fghj",
      company: "Company 999",
    },
    {
      user: "user2",
      email: "aaa@user2.pl",
      uri: "sdfghnbvfgh/fghj",
      company: "Company 222",
    },
    {
      user: "user4",
      email: "aaa@user4.pl",
      uri: "sdfghnbvfgh/fghj",
      company: "Company 222",
    },
    {
      user: "user5",
      email: "aaa@user5.pl",
      uri: "sdfghnbvfghjnbghj/fghj",
      company: "Company 999",
    },
  ];

  // console.log(data[1].user);
  const companies = [
    { name: "Company 123", uri: "/companies/0" },
    { name: "Company 999", uri: "/companies/1" },
    { name: "Company 222", uri: "/companies/2" },
  ];

  const findCompany = () => {
    let dataEployees = [];
    for (let i = 0; i < data.length; i++) {
      let companyName = data[i].company;
      // find in array companies => companyName and ADD data[i] to companies[i].employees
      let employee = [data[i]][0];
      let companyObject = companies.filter((x) => x.name === companyName);

      let companyIndex = companies.findIndex((x) => x.name === companyName);

      if (companies[companyIndex].name === companyName) {
        dataEployees.push(employee);
        companies[companyIndex].employees = dataEployees;
      }

      // console.log(companyIndex);

      // console.log(companyObject);
      // console.log(companyName);

      console.log(employee);
      // console.log(dataEployees);
      // dataEployees.push(employee);
      // companies[companyIndex].employees = dataEployees;

      console.log(companyObject);

      // companyObject.employees = data[i];

      // companies.employees = data[i];
      // console.log(companies);
    }
  };

  findCompany();

  // const data = JSON.parse(users);
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
};;

document.addEventListener("DOMContentLoaded", usersFromJson());
