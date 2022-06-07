import { User, Company, CompanyWithUsers } from "./types";

const fetchUsers = async (): Promise<User> => {
  let uri: string = "http://localhost:3000/users";
  const res: Response = await fetch(uri);
  const users: User = await res.json();
  return users;
};

const fetchCompanies = async (): Promise<Company> => {
  let uri: string = "http://localhost:3000/companies";
  const res: Response = await fetch(uri);
  const companies: Company = await res.json();
  return companies;
};

const addUsersToCompanies = (users: User[], companies: Company[]) =>
  companies.map((x) => ({
    name: x.name,
    employees: users
      .filter((y) => y.uris.company === x.uri)
      .map((z) => z.name)
      .join(", "),
  }));

const findColumnName = (columnsNames: string[], objectToAnalyse: CompanyWithUsers[]) => {
  for (let objectKey in objectToAnalyse) {
    const doesColumnExist = columnsNames.indexOf(objectKey) === -1;
    if (doesColumnExist) {
      columnsNames.push(objectKey);
    }
  }
};

const populateColumns = (companiesWithUsers: any) => {
  const columnsNames: any = [];
  companiesWithUsers.forEach((companiesWithUsers: CompanyWithUsers[]) => {
    findColumnName(columnsNames, companiesWithUsers);
  });
  return columnsNames;
};

const table = document.createElement("table");
const headerRow = table.insertRow();

const setHeaderCell = (headerContent: string) => {
  const headerElement = document.createElement("th");
  headerElement.innerHTML = headerContent;
  headerRow.appendChild(headerElement);
};

const populateHeader = (table: HTMLTableElement, columns: any) => {
  columns.forEach((column: string) => {
    setHeaderCell(column);
  });
};

const populateRows = (companiesWithUsers: CompanyWithUsers[], columns: number, table: HTMLTableElement) => {
  companiesWithUsers.forEach((item) => {
    const row: HTMLTableRowElement = table.insertRow();
    const columns: any = [];
    row.insertCell().innerHTML = item[columns];
  });
};

const displayTableContent = (table: HTMLTableElement) => {
  const divShowData: HTMLDivElement | null = document.querySelector("showData");
  divShowData.innerHTML = "";
  divShowData.appendChild(table);
};

const renderTable = (companiesWithUsers: CompanyWithUsers[]) => {
  const table: any = document.createElement("table");
  const columns = populateColumns(companiesWithUsers);

  populateHeader(table, columns);
  populateRows(companiesWithUsers, table, columns);
  displayTableContent(table);
};

const printUsers: any = async () => {
  const users: any = await fetchUsers();
  const companies: any = await fetchCompanies();
  const companiesWithUsers: any = addUsersToCompanies(users, companies);
  renderTable(companiesWithUsers);
};

document.addEventListener("DOMContentLoaded", printUsers());
