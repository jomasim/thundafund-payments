"use strict";
exports.__esModule = true;
var react_1 = require("react");
// @ts-ignore
var react_router_dom_1 = require("react-router-dom");
var PaymentsPage_1 = require("../PaymentsPage");
var App = function () {
    return react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/:projectID", component: PaymentsPage_1["default"] }))));
};
exports["default"] = App;
