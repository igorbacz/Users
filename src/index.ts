import { DataInterface, CompaniesInterface, NewCompaniesInterface, NewCompanies, Companies } from "./types";

const renderUsers = async (): Promise<DataInterface> => {
  let uri: string = "http://localhost:3000/users";

  const res: Response = await fetch(uri);
  const data: DataInterface = await res.json();
  return data;
};

const renderCompanies = async (): Promise<Companies> => {
  let uri: string = "http://localhost:3000/companies";

  const res: Response = await fetch(uri);
  const companies: Companies = await res.json();
  return companies;
};

const printUserss = async (): Promise<void> => {
  const data: DataInterface = await renderUsers();
  const companies: Companies = await renderCompanies();

  const usersFromJson = () => {
    const addUserstoCompany = () => {
      const newCompanies: NewCompanies = companies.companies.map((x) => ({
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

      let table = <HTMLTableElement>document.createElement("table");
      let tr = <HTMLTableRowElement>table.insertRow(-1);

      for (let i = 0; i < col.length; i++) {
        let th = <HTMLTableCellElement>document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
      }

      for (let i = 0; i < newCompanies.length; i++) {
        tr = <HTMLTableRowElement>table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
          let tabCell = <HTMLTableCellElement>tr.insertCell(-1);
          tabCell.innerHTML = newCompanies[i][col[j]];
        }
      }
      const divShowData = <HTMLDivElement>document.querySelector("showData");
      divShowData.innerHTML = "";
      divShowData.appendChild(table);
    };
    addUserstoCompany();
  };
  usersFromJson();
};

document.addEventListener("DOMContentLoaded", printUserss());
