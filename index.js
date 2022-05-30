// import users from "../Users/API/db.json" assert { type: "json" };

// console.log(users);

// const data = JSON.parse(users);

const usersFromJson = () => {
  const data = [
    {
      user: "user1",
      email: "aaa@user1.pl",
      uri: "/users/1",
      company: "Company 2",
      uris: { company: "/companies/2" },
    },
    {
      user: "user3",
      email: "aaa@user3.pl",
      uri: "/users/3",
      company: "Company 2",
      uris: { company: "/companies/2" },
    },
    {
      user: "user2",
      email: "aaa@user2.pl",
      uri: "/users/2",
      company: "Company 0",
      uris: { company: "/companies/0" },
    },
    {
      user: "user4",
      email: "aaa@user4.pl",
      uri: "/users/4",
      company: "Company 1",
      uris: { company: "/companies/1" },
    },
    {
      user: "user5",
      email: "aaa@user5.pl",
      uri: "/users/5",
      company: "Company 0",
      uris: { company: "/companies/0" },
    },
  ];

  const companies = [
    { name: "Company 0", uri: "/companies/0" },
    { name: "Company 1", uri: "/companies/1" },
    { name: "Company 2", uri: "/companies/2" },
  ];

  const findCompany = () => {
    for (let i = 0; i < data.length; i++) {
      let companyUris = data[i].uris.company;
      let employee = [data[i]][0];

      let companyObject = companies.filter((x) => x.uri === companyUris);

      let companyIndex = companies.findIndex((x) => x.uri === companyUris);

      console.log(employee);
      console.log(companyObject[0]);
      console.log(companyIndex);

      if (employee.uris.company === companyObject[0].uri) {
        let dataEployees = [];
        companies[companyIndex].employees = dataEployees;3‹
        console.log("match");
        companyObject[0].employees = employee;
      }

      console.log(companies);

      // console.log(companyObject[0]);
      // if (employee) {
      // }

      // let companiesUsers = { ...companyObject[0], employee };
      // console.log(companiesUsers);

      // console.log(companies[companyIndex]);
      // console.log(companyObject[0]);

      // if (companies[companyIndex].uri === companyUris) {
      // }

      // console.log(companyIndex);   WORKS

      // console.log(companyUris);    WORKS

      // console.log(dataEployees);
      // dataEployees.push(employee);
      // // companies[companyIndex].employees = dataEployees;

      // companyObject[0].employees = data[i];

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
};

document.addEventListener("DOMContentLoaded", usersFromJson());
