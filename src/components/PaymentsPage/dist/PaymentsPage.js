"use strict";
exports.__esModule = true;
var react_1 = require("react");
var header_1 = require("./subcomponents/header");
require("./PaymentsPage.scss");
var MainComponent_1 = require("./subcomponents/MainComponent");
var PaymentsPage = function (props) {
    var proj_id = props.match.params.projectID;
    return react_1["default"].createElement("div", null,
        react_1["default"].createElement(header_1["default"], null),
        react_1["default"].createElement(MainComponent_1["default"], { projectid: proj_id }));
};
exports["default"] = PaymentsPage;
