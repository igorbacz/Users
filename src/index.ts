interface dataInterface {
  name: string;
  uri: string;
  email: string;
  uris: object;
  company: string;
}

interface companiesInterface {
  name: string;
  uri: string;
}

interface newCompaniesInterface {
  name: string;
  employees: string[];
}

const renderUsers = async (): Promise<dataInterface> => {
  let uri: string = "http://localhost:3000/users";

  const res: Response = await fetch(uri);
  const data: dataInterface = await res.json();
  return data;
};

const renderCompanies = async (): Promise<companiesInterface> => {
  let uri: string = "http://localhost:3000/companies";

  const res: Response = await fetch(uri);
  const companies: companiesInterface = await res.json();
  return companies;
};

const printUserss = async (): Promise<void> => {
  const data: dataInterface = await renderUsers();
  const companies: companiesInterface = await renderCompanies();

  const usersFromJson = () => {
    const addUserstoCompany = () => {
      const newCompanies: newCompaniesInterface = companies.map((x) => ({
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

      let table = document.createElement("table") as HTMLTableElement;
      let tr = table.insertRow(-1) as HTMLTableRowElement;

      for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th") as HTMLTableCellElement;
        th.innerHTML = col[i];
        tr.appendChild(th);
      }

      for (let i = 0; i < newCompanies.length; i++) {
        tr = table.insertRow(-1) as HTMLTableRowElement;

        for (let j = 0; j < col.length; j++) {
          let tabCell = tr.insertCell(-1) as HTMLTableCellElement;
          tabCell.innerHTML = newCompanies[i][col[j]];
        }
      }
      const divShowData = document.getElementById("showData") as HTMLElement;
      divShowData.innerHTML = "";
      divShowData.appendChild(table);
    };
    addUserstoCompany();
  };
  usersFromJson();
};

document.addEventListener("DOMContentLoaded", printUserss());
