"use strict";
exports.__esModule = true;
exports.get_exhangeRates = exports.get_payments = void 0;
exports.get_payments = function (project_id) {
    return fetch("http://dq8ge.mocklab.io/details/" + project_id, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(function (res) { return res.json(); });
};
exports.get_exhangeRates = function () {
    return fetch("https://thundafundnew.appspot.com/api/detect_country", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(function (res) { return res.json(); });
};
