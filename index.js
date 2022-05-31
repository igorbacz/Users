import users from "./db.json" assert { type: "json" };

const usersFromJson = () => {
  const data = users.users;
  const companies = users.companies;

  const addUserstoCompany = () => {
    const newCompanies = companies.map((x) => ({
      name: x.name,
      employees: data
        .filter((y) => y.uris.company === x.uri)
        .map((z) => z.name)
        .join(", "),
    }));

    let col = [];
    for (let i = 0; i < newCompanies.length; i++) {
      for (let key in newCompanies[i]) {
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

    for (let i = 0; i < newCompanies.length; i++) {
      tr = table.insertRow(-1);

      for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = newCompanies[i][col[j]];
      }
    }
    const divShowData = document.getElementById("showData");
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
  };
  addUserstoCompany();
};

document.addEventListener("DOMContentLoaded", usersFromJson());
