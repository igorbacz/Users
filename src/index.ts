import { User, Company, CompanyWithUsers } from "./types";
// start the server: npx json-server --watch db.json


const fetchUsers = async (): Promise<User[]> => {
  let uri: string = "http://localhost:3000/users";
  const res: Response = await fetch(uri);
  const users: User[] = await res.json();
  return users;
};

const fetchCompanies = async (): Promise<Company[]> => {
  let uri: string = "http://localhost:3000/companies";
  const res: Response = await fetch(uri);
  const companies: Company[] = await res.json();
  return companies;
};

const addUsersToCompanies = (users: User[], companies: Company[]) =>
  companies.map((x) => ({
    name: x.name,
    employees: users
      .filter((y: User) => y.uris.company === x.uri)
      .map((z: User) => z.name)
      .join(", "),
  }));

const table: HTMLTableElement = document.createElement("table");
const headerRow: HTMLTableRowElement = table.insertRow();

const setHeaderCell = (headerContent: string) => {
  const headerElement = document.createElement("th");
  headerElement.innerHTML = headerContent;
  headerRow.appendChild(headerElement);
};

const populateHeader = (columns: string[]) => {
  columns.forEach((column: string) => {
    setHeaderCell(column);
  });
};

const populateRows = (companiesWithUsers: CompanyWithUsers[]) => {
  companiesWithUsers.forEach((item: any) => {
    const row: HTMLTableRowElement = table.insertRow();
    const columns: string[] = ["name", "employees"];
    columns.forEach((column: string) => {
      row.insertCell().innerHTML = item[column];
    });
  });
};

const displayTableContent = () => {
  const divShowData: HTMLDivElement | null = document.querySelector("#showData");
  if (!divShowData) {
    return;
  }
  divShowData.innerHTML = "";
  divShowData.appendChild(table);
};

const renderTable = (companiesWithUsers: CompanyWithUsers[]) => {
  const columns: string[] = ["name", "employees"];
  populateHeader(columns);
  populateRows(companiesWithUsers);
  displayTableContent();
};

const printUsers: any = async () => {
  const users: User[] = await fetchUsers();
  const companies: Company[] = await fetchCompanies();
  const companiesWithUsers: CompanyWithUsers[] = addUsersToCompanies(users, companies);
  renderTable(companiesWithUsers);
};

document.addEventListener("DOMContentLoaded", printUsers());
