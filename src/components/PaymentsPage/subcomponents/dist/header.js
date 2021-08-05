"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var fa_1 = require("react-icons/fa");
var ai_1 = require("react-icons/ai");
require("../PaymentsPage.scss");
var Header = function () {
    return react_1["default"].createElement("div", { className: "Header" },
        react_1["default"].createElement(react_bootstrap_1.Navbar, { bg: "light", expand: "lg" },
            react_1["default"].createElement(react_bootstrap_1.Navbar.Brand, { href: "/" },
                react_1["default"].createElement("img", { src: "https://thundafund.com/static/img/thundafundlogo.png" }),
                "  "),
            react_1["default"].createElement(react_bootstrap_1.Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
            react_1["default"].createElement(react_bootstrap_1.Navbar.Collapse, { id: "basic-navbar-nav" },
                react_1["default"].createElement(react_bootstrap_1.Nav, { className: "mr-auto" },
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { className: "Header_spunderline sp_top", href: "#home" }, "Discover"),
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { className: "sp_top", href: "#link" }, "Start a Project"),
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: "#link" },
                        react_1["default"].createElement("form", { role: "search", method: "get", className: "search-form form", action: "" },
                            react_1["default"].createElement("label", null,
                                react_1["default"].createElement("span", { className: "screen-reader-text" }, "Search for..."),
                                react_1["default"].createElement("input", { type: "search", className: "search-field", placeholder: "Type something...", value: "", name: "s", title: "" })),
                            react_1["default"].createElement("button", { className: "search-submit button" },
                                "  ",
                                react_1["default"].createElement(fa_1.FaSearchengin, null),
                                "  ")))),
                react_1["default"].createElement(react_bootstrap_1.Nav, null,
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: "#link" }, "Already Have a Project  ?"),
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { className: "Header_signin", href: "#link" }, "Sign In")))),
        react_1["default"].createElement("div", { className: "crumblinks" },
            react_1["default"].createElement(react_bootstrap_1.Navbar, { className: "shadow", expand: "lg", variant: "light", bg: "light" },
                react_1["default"].createElement(react_bootstrap_1.Container, null,
                    react_1["default"].createElement(react_bootstrap_1.Navbar.Brand, { href: "#home" },
                        " ",
                        react_1["default"].createElement(ai_1.AiOutlineArrowLeft, null),
                        "  Back to Project ")))));
};
exports["default"] = Header;
