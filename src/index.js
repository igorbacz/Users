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
const renderUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let uri = "http://localhost:3000/users";
    const res = yield fetch(uri);
    const data = yield res.json();
    return data;
});
const renderCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    let uri = "http://localhost:3000/companies";
    const res = yield fetch(uri);
    const companies = yield res.json();
    return companies;
});
const printUserss = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield renderUsers();
    const companies = yield renderCompanies();
    const usersFromJson = () => {
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
    usersFromJson();
});
document.addEventListener("DOMContentLoaded", printUserss());
