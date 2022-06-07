"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const findColumnName = (columnsNames, objectToAnalyse) => {
    for (let objectKey in objectToAnalyse) {
        const doesColumnExist = columnsNames.indexOf(objectKey) === -1;
        if (doesColumnExist) {
            columnsNames.push(objectKey);
        }
    }
};
const populateColumns = (companiesWithUsers) => {
    const columnsNames = [];
    companiesWithUsers.forEach((companiesWithUsers) => {
        findColumnName(columnsNames, companiesWithUsers);
    });
    return columnsNames;
};
const table = document.createElement("table");
const headerRow = table.insertRow();
const setHeaderCell = (headerContent) => {
    const headerElement = document.createElement("th");
    headerElement.innerHTML = headerContent;
    headerRow.appendChild(headerElement);
};
const populateHeader = (table, columns) => {
    columns.forEach((column) => {
        setHeaderCell(column);
    });
};
const populateRows = (companiesWithUsers, columns, table) => {
    companiesWithUsers.forEach((item) => {
        const row = table.insertRow();
        const columns = [];
        row.insertCell().innerHTML = item[columns];
    });
};
const displayTableContent = (table) => {
    const divShowData = document.querySelector("showData");
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
};
const renderTable = (companiesWithUsers) => {
    const table = document.createElement("table");
    const columns = populateColumns(companiesWithUsers);
    populateHeader(table, columns);
    populateRows(companiesWithUsers, table, columns);
    displayTableContent(table);
};
const printUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield fetchUsers();
    const companies = yield fetchCompanies();
    const companiesWithUsers = addUsersToCompanies(users, companies);
    renderTable(companiesWithUsers);
});
document.addEventListener("DOMContentLoaded", printUsers());
