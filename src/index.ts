import { User, Company, CompanyWithUsers } from "./types";

const fetchUsers = async (): Promise<User> => {
  let uri: string = "http://localhost:3000/users";
  const res: Response = await fetch(uri);
  const data: User = await res.json();
  return data;
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
  for (let ObjectKey in objectToAnalyse) {
    const doesColumnExist = columnsNames.indexOf(ObjectKey) === -1;
    if (doesColumnExist) {
      columnsNames.push(ObjectKey);
    }
  }
};

const populateColumns = (companiesWithUsers: any) => {
  const columnsNames: string[] = [];
  companiesWithUsers.forEach((companiesWithUsers: CompanyWithUsers[]) => {
    findColumnName(columnsNames, companiesWithUsers);
  });
  return columnsNames;
};

const setHeaderCell = (headerContent: string, ) => {
  const headerElement = document.createElement("th");
  headerElement.innerHTML = headerContent;
  const headerRow = insertRow();
  headerRow.appendChild(headerElement);
};

const populateHeader = (table: HTMLTableElement, columns: any) => {
  let column = [];
  const headerRow = table.insertRow();
  columns.forEach((column) => {
    setHeaderCell(column);
  });
  return headerRow; // ?????
};

const populateRows = (companiesWithUsers: CompanyWithUsers[], columns:number => {
  /// coś tu nie działa TO DO
  companiesWithUsers.forEach((item) => {
    const table: HTMLTableElement = document.createElement("table");

    const row: HTMLTableRowElement = table.insertRow();
    const columns: any[] = [];
    row.insertCell().innerHTML = item[columns];
  });
};

const displayTableContent = (table: HTMLTableElement) => {
  const divShowData: HTMLDivElement | null = document.querySelector("showData");
  divShowData.innerHTML = "";
  divShowData.appendChild(table);
};

const renderTable = (companiesWithUsers: CompanyWithUsers[]) => {
  const table = <HTMLTableElement>document.createElement("table");
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
