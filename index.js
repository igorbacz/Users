// start the server: npx json-server --watch db.json

const renderUsers = async () => {
  let uri = "http://localhost:3000/users";

  const res = await fetch(uri);
  const data = await res.json();
  return data;
};

const renderCompanies = async () => {
  let uri = "http://localhost:3000/companies";

  const res = await fetch(uri);
  const companies = await res.json();
  return companies;
};

const printUserss = async () => {
  const data = await renderUsers();
  const companies = await renderCompanies();

  const usersFromJson = () => {
    const addUserstoCompany = () => {
      const newCompanies = companies.map((x) => ({
        name: x.name,
        employees: data
          .filter((y) => y.uris.company === x.uri)
          .map((z) => z.name)
          .join(", "),
      }));

      let col = [];       <==== FIND COLUMN NAME
      for (let i = 0; i < newCompanies.length; i++) {
        for (let key in newCompanies[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key);
          }
        }
      }

      let tr = table.insertRow(-1);  

      for (let i = 0; i < col.length; i++) {  // <===== SET HEADER CELL, 
        let th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
      }

      for (let i = 0; i < newCompanies.length; i++) {   // <=== POPULATE HEADER
        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {  ////POPULATE ROWS
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
  usersFromJson();
};

document.addEventListener("DOMContentLoaded", printUserss());
