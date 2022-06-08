var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let uri = "http://localhost:3000/users";
    const res = yield fetch(uri);
    const users = yield res.json();
    return users;
});
const fetchCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    let uri = "http://localhost:3000/companies";
    const res = yield fetch(uri);
    const companies = yield res.json();
    return companies;
});
const addUsersToCompanies = (users, companies) => companies.map((x) => ({
    name: x.name,
    employees: users
        .filter((y) => y.uris.company === x.uri)
        .map((z) => z.name)
        .join(", "),
}));
const table = document.createElement("table");
const headerRow = table.insertRow();
const setHeaderCell = (headerContent) => {
    const headerElement = document.createElement("th");
    headerElement.innerHTML = headerContent;
    headerRow.appendChild(headerElement);
};
const populateHeader = (columns) => {
    columns.forEach((column) => {
        setHeaderCell(column);
    });
};
const populateRows = (companiesWithUsers) => {
    companiesWithUsers.forEach((item) => {
        const row = table.insertRow();
        const columns = ["name", "employees"];
        columns.forEach((col) => {
            row.insertCell().innerHTML = item[col];
        });
    });
};
const displayTableContent = () => {
    const divShowData = document.querySelector("#showData");
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
};
const renderTable = (companiesWithUsers) => {
    const columns = ["name", "employees"];
    populateHeader(columns);
    populateRows(companiesWithUsers);
    displayTableContent();
};
const printUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield fetchUsers();
    const companies = yield fetchCompanies();
    const companiesWithUsers = addUsersToCompanies(users, companies);
    renderTable(companiesWithUsers);
});
document.addEventListener("DOMContentLoaded", printUsers());
export {};
