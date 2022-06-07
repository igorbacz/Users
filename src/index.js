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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fetchUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var uri, res, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uri = "http://localhost:3000/users";
                return [4 /*yield*/, fetch(uri)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                users = _a.sent();
                return [2 /*return*/, users];
        }
    });
}); };
var fetchCompanies = function () { return __awaiter(void 0, void 0, void 0, function () {
    var uri, res, companies;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uri = "http://localhost:3000/companies";
                return [4 /*yield*/, fetch(uri)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                companies = _a.sent();
                return [2 /*return*/, companies];
        }
    });
}); };
var addUsersToCompanies = function (users, companies) {
    return companies.map(function (x) { return ({
        name: x.name,
        employees: users
            .filter(function (y) { return y.uris.company === x.uri; })
            .map(function (z) { return z.name; })
            .join(", ")
    }); });
};
var findColumnName = function (columnsNames, objectToAnalyse) {
    for (var objectKey in objectToAnalyse) {
        var doesColumnExist = columnsNames.indexOf(objectKey) === -1;
        if (doesColumnExist) {
            columnsNames.push(objectKey);
        }
    }
};
var populateColumns = function (companiesWithUsers) {
    var columnsNames = [];
    companiesWithUsers.forEach(function (companiesWithUsers) {
        findColumnName(columnsNames, companiesWithUsers);
    });
    return columnsNames;
};
var setHeaderCell = function (headerContent) {
    var headerElement = document.createElement("th");
    headerElement.innerHTML = headerContent;
    headerRow.appendChild(headerElement);
};
var populateHeader = function (table, columns) {
    var headerRow = table.insertRow();
    columns.forEach(function (column) {
        setHeaderCell(column);
    });
};
var populateRows = function (companiesWithUsers, columns, table) {
    companiesWithUsers.forEach(function (item) {
        var row = table.insertRow();
        var columns = [];
        row.insertCell().innerHTML = item[columns];
    });
};
var displayTableContent = function (table) {
    var divShowData = document.querySelector("showData");
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
};
var renderTable = function (companiesWithUsers) {
    var table = document.createElement("table");
    var columns = populateColumns(companiesWithUsers);
    populateHeader(table, columns);
    populateRows(companiesWithUsers, table, columns);
    displayTableContent(table);
};
var printUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, companies, companiesWithUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchUsers()];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, fetchCompanies()];
            case 2:
                companies = _a.sent();
                companiesWithUsers = addUsersToCompanies(users, companies);
                renderTable(companiesWithUsers);
                return [2 /*return*/];
        }
    });
}); };
document.addEventListener("DOMContentLoaded", printUsers());
