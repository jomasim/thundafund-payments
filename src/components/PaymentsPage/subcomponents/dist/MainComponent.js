"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var ai_1 = require("react-icons/ai");
var fi_1 = require("react-icons/fi");
var payments_api_1 = require("../../API/payments_api");
require("../PaymentsPage.scss");
var MainComponent = function (props) {
    var _a = react_1.useState(false), showGiveMore = _a[0], setShowGiveMore = _a[1];
    var _b = react_1.useState([]), projectData = _b[0], setprojectData = _b[1];
    var _c = react_1.useState(1), payAmount = _c[0], setPayAmount = _c[1];
    var _d = react_1.useState(0), convertedAmount = _d[0], setConvertedAmount = _d[1];
    var _e = react_1.useState(1), rewardQuantity = _e[0], setRewardQuantity = _e[1];
    var _f = react_1.useState(''), selectedProjectID = _f[0], setselectedProjectID = _f[1];
    var _g = react_1.useState(false), checkedCustomReward = _g[0], setcheckedCustomReward = _g[1];
    var _h = react_1.useState(0), addAditionalAmount = _h[0], setAdditionalAmount = _h[1];
    var _j = react_1.useState({
        'exchange_currency_code': 0,
        'home_currency_rate': 0,
        'away_currency_rate': 0
    }), exchangeParams = _j[0], setExchangeParams = _j[1];
    var _k = react_1.useState({
        "creator": '',
        "project_currency_symbol": '',
        "project_currency_code": '',
        "project_name": ''
    }), metadata = _k[0], setMetaData = _k[1];
    react_1.useEffect(function () {
        get_parameters(call_exchangeRate);
    }, []);
    var get_parameters = function (callback) {
        var projectID = props.projectid;
        payments_api_1.get_payments(projectID).then(function (res) {
            var payment_data = JSON.parse(JSON.stringify(res));
            setprojectData(payment_data["project_data"]["rewards"]);
            var json_node = payment_data["project_data"];
            setMetaData(__assign(__assign({}, metadata), { "creator": json_node["creator"], "project_currency_symbol": json_node["project_currency_symbol"], "project_currency_code": json_node["project_currency_code"], "project_name": json_node["project_name"] }));
            callback(json_node["project_currency_code"]);
        });
    };
    function call_exchangeRate(country_code) {
        return __awaiter(this, void 0, void 0, function () {
            var exchange_params, home_curr_code, home_curr_rate, away_crr_rate, converted_amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, get_exchangeRate()];
                    case 1:
                        exchange_params = _a.sent();
                        home_curr_code = exchange_params["currency_code"];
                        home_curr_rate = exchange_params["exchange_rates"]["rates"][country_code];
                        away_crr_rate = exchange_params["exchange_rates"]["rates"][home_curr_code];
                        converted_amount = Math.trunc(1 / home_curr_rate * away_crr_rate * payAmount);
                        setConvertedAmount(converted_amount);
                        setExchangeParams(__assign(__assign({}, exchangeParams), { "exchange_currency_code": home_curr_code, "home_currency_rate": home_curr_rate, "away_currency_rate": away_crr_rate }));
                        return [2 /*return*/];
                }
            });
        });
    }
    function get_exchangeRate() {
        return __awaiter(this, void 0, void 0, function () {
            var jsonRes;
            return __generator(this, function (_a) {
                console.log("Started");
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        payments_api_1.get_exhangeRates().then(function (response) {
                            var resp = JSON.parse(JSON.stringify(response));
                            // rate = resp["exchange_rates"]["rates"][currency_code];
                            resolve(resp);
                        });
                    })];
            });
        });
    }
    var reduceRewards = function () {
        if (rewardQuantity > 1) {
            setRewardQuantity(rewardQuantity - 1);
        }
    };
    var setPayoutValues = function (e) {
        setPayAmount(e);
    };
    var helpWithRewards = function (id, amount) {
        setselectedProjectID(id);
        setPayAmount(amount);
    };
    var setAddAmount = function (e) {
        setAdditionalAmount(e);
    };
    return react_1["default"].createElement("div", { className: "MainComponent" },
        react_1["default"].createElement(react_bootstrap_1.Container, null,
            react_1["default"].createElement(react_bootstrap_1.Row, null,
                react_1["default"].createElement(react_bootstrap_1.Col, { sm: 12, lg: 12, md: 12, className: "MainComponent_header" },
                    react_1["default"].createElement("h5", null,
                        " ",
                        metadata.project_name,
                        " "),
                    react_1["default"].createElement("h6", null,
                        " ",
                        react_1["default"].createElement("span", null, "by "),
                        "  ",
                        react_1["default"].createElement("a", { href: "/#" },
                            " ",
                            metadata.creator,
                            " "),
                        "  "))),
            react_1["default"].createElement(react_bootstrap_1.Row, null,
                react_1["default"].createElement(react_bootstrap_1.Col, { sm: 12, lg: 8, md: 7, className: "MainComponent_content" },
                    react_1["default"].createElement(react_bootstrap_1.Form, null,
                        react_1["default"].createElement("ul", null,
                            react_1["default"].createElement("li", null,
                                react_1["default"].createElement(react_bootstrap_1.Card, { className: "shadow" },
                                    react_1["default"].createElement(react_bootstrap_1.Card.Body, null,
                                        react_1["default"].createElement("p", null,
                                            react_1["default"].createElement(react_bootstrap_1.Form.Check, { type: "radio", name: "rewards", checked: checkedCustomReward, onChange: function () { return setcheckedCustomReward(!checkedCustomReward); }, label: "Help Fund without recieving a reward" })),
                                        react_1["default"].createElement("p", null,
                                            react_1["default"].createElement("div", { className: "input_enter" },
                                                react_1["default"].createElement(react_bootstrap_1.Col, { sm: 12, md: 6, lg: 6, xs: 12, className: "pledge_box" },
                                                    react_1["default"].createElement("span", null, " Custom Pledge "),
                                                    react_1["default"].createElement("div", { className: "clear-fix" }),
                                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, { htmlFor: "inlineFormInputGroup", srOnly: true }, "Amount"),
                                                    react_1["default"].createElement(react_bootstrap_1.InputGroup, { className: "mb-2" },
                                                        react_1["default"].createElement(react_bootstrap_1.InputGroup.Prepend, null,
                                                            react_1["default"].createElement(react_bootstrap_1.InputGroup.Text, null, metadata.project_currency_symbol)),
                                                        react_1["default"].createElement(react_bootstrap_1.FormControl, { id: "inlineFormInputGroup", disabled: !checkedCustomReward, value: payAmount, onChange: function (e) { return setPayoutValues(e.target.value); }, placeholder: "Amount", type: "number" })))))))),
                            projectData && //check for rewards not null
                                projectData.map(function (value, index) {
                                    return (react_1["default"].createElement("li", { key: index },
                                        react_1["default"].createElement(react_bootstrap_1.Card, { className: "shadow" },
                                            react_1["default"].createElement(react_bootstrap_1.Card.Body, null,
                                                react_1["default"].createElement(react_bootstrap_1.Row, { className: "mb-3" },
                                                    react_1["default"].createElement(react_bootstrap_1.Col, { lg: 9, md: 9, sm: 9, xs: 12 },
                                                        "    ",
                                                        react_1["default"].createElement(react_bootstrap_1.Form.Check, { type: "radio", name: "rewards", checked: selectedProjectID == value.id, onClick: function () { return helpWithRewards(value.id, value.reward_amount); }, value: value.id, label: value.reward_currency + " " + value.reward_amount + " " + value.name }),
                                                        "  "),
                                                    react_1["default"].createElement(react_bootstrap_1.Col, { lg: 3, md: 6, sm: 6, xs: 6, className: "increase_decrease" },
                                                        react_1["default"].createElement("div", { className: "input-group cart_controller" },
                                                            react_1["default"].createElement("span", { className: "input-group-btn" },
                                                                react_1["default"].createElement("button", { type: "button", onClick: function () { return reduceRewards(); }, className: "btn btn-default btn-number", disabled: selectedProjectID == value.id ? false : true, "data-type": "minus", "data-field": "quant[1]" },
                                                                    react_1["default"].createElement(ai_1.AiOutlineMinus, null))),
                                                            react_1["default"].createElement("input", { type: "number", className: "form-control input-number", value: selectedProjectID == value.id ? rewardQuantity : 1, min: "1", max: "10" }),
                                                            react_1["default"].createElement("span", { className: "input-group-btn" },
                                                                react_1["default"].createElement("button", { onClick: function () { return setRewardQuantity(rewardQuantity + 1); }, disabled: selectedProjectID == value.id ? false : true, type: "button", className: "btn btn-default btn-number", "data-type": "plus", "data-field": "quant[1]" },
                                                                    react_1["default"].createElement(ai_1.AiOutlinePlus, null)))))),
                                                react_1["default"].createElement(react_bootstrap_1.Row, { className: "reward_story" },
                                                    react_1["default"].createElement(react_bootstrap_1.Col, { xs: 12, md: 3, sm: 3, lg: 3 },
                                                        react_1["default"].createElement("img", { src: value.image_url, alt: "img" })),
                                                    react_1["default"].createElement(react_bootstrap_1.Col, { xs: 12, md: 9, sm: 12, lg: 9 },
                                                        react_1["default"].createElement("p", null,
                                                            " ",
                                                            value.rewarddescription))),
                                                react_1["default"].createElement(react_bootstrap_1.Row, null,
                                                    react_1["default"].createElement(react_bootstrap_1.Col, { xs: 12, lg: 12, className: "border-top  border-bottom pt-1 pb-1" },
                                                        react_1["default"].createElement(react_bootstrap_1.Row, { className: "time_estimates" },
                                                            react_1["default"].createElement(react_bootstrap_1.Col, { xs: 6, md: 6, lg: 6, sm: 6 },
                                                                "  ",
                                                                react_1["default"].createElement(ai_1.AiOutlineCalendar, null),
                                                                "  \u00A0   ",
                                                                react_1["default"].createElement("span", null,
                                                                    " Estimated  ",
                                                                    value.delivery_date,
                                                                    " ")),
                                                            react_1["default"].createElement(react_bootstrap_1.Col, { xs: 6, md: 6, lg: 6, sm: 6 },
                                                                "  ",
                                                                react_1["default"].createElement(fi_1.FiTruck, null),
                                                                " \u00A0   ",
                                                                react_1["default"].createElement("span", null,
                                                                    " Delivery To   ",
                                                                    value.shipping_details === "local" ? react_1["default"].createElement(react_1["default"].Fragment, null, " South Africa Only") : react_1["default"].createElement(react_1["default"].Fragment, null, " International "),
                                                                    "      "))))),
                                                react_1["default"].createElement("div", { className: "clearfix" }, " "),
                                                react_1["default"].createElement(react_bootstrap_1.Row, { className: "mt-2" }, showGiveMore ? react_1["default"].createElement(react_1["default"].Fragment, null, selectedProjectID == value.id ? react_1["default"].createElement(react_1["default"].Fragment, null,
                                                    react_1["default"].createElement(react_bootstrap_1.Col, { xs: 12, md: 12, lg: 12 },
                                                        react_1["default"].createElement(react_bootstrap_1.InputGroup, { className: "mb-3" },
                                                            react_1["default"].createElement(react_bootstrap_1.FormControl, { onChange: function (e) { return setAddAmount(e.target.value); }, placeholder: "Enter Amount", "aria-label": "Amount", "aria-describedby": "basic-addon2", type: "number" }),
                                                            react_1["default"].createElement(react_bootstrap_1.InputGroup.Append, null,
                                                                react_1["default"].createElement(react_bootstrap_1.Button, { onClick: function () { return setShowGiveMore(false); }, variant: "danger" }, "Cancel"))))) : react_1["default"].createElement(react_1["default"].Fragment, null, " ")) : react_1["default"].createElement(react_1["default"].Fragment, null,
                                                    react_1["default"].createElement(react_bootstrap_1.Col, { xs: 12, md: 12, lg: 12, className: "give_more" },
                                                        react_1["default"].createElement("span", null, "Want to give More?"),
                                                        react_1["default"].createElement("div", { className: "clearfix" }),
                                                        react_1["default"].createElement(react_1["default"].Fragment, null,
                                                            "   ",
                                                            selectedProjectID == value.id ?
                                                                react_1["default"].createElement("span", { className: "sp", onClick: function () { return setShowGiveMore(true); } },
                                                                    " ",
                                                                    react_1["default"].createElement(ai_1.AiOutlinePlus, null),
                                                                    " Additional Amount  ")
                                                                :
                                                                    react_1["default"].createElement("span", { className: "sp" },
                                                                        " ",
                                                                        react_1["default"].createElement(ai_1.AiOutlinePlus, null),
                                                                        " Additional Amount  "),
                                                            "    "))))))));
                                })))),
                react_1["default"].createElement(react_bootstrap_1.Col, { sm: 12, lg: 4, md: 5, xs: 12, className: "projectFunding" },
                    react_1["default"].createElement(react_bootstrap_1.Card, { style: { width: '100%' } },
                        react_1["default"].createElement(react_bootstrap_1.Card.Header, null,
                            "Total Cost: ",
                            metadata.project_currency_symbol,
                            " ",
                            (payAmount * rewardQuantity),
                            react_1["default"].createElement("div", { className: "clearfix" }),
                            react_1["default"].createElement("span", { className: "converted_amt" },
                                "  + Addtional Amount ",
                                addAditionalAmount,
                                "   ")),
                        react_1["default"].createElement(react_bootstrap_1.Card.Subtitle, { className: "mb-2 mt-3 pl-3 text-muted" }, "Select Payment Method"),
                        react_1["default"].createElement(react_bootstrap_1.ListGroup, { variant: "flush" },
                            react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, null,
                                "       ",
                                react_1["default"].createElement(react_bootstrap_1.Form.Check, { type: "radio", label: "Visa/Master Card (International)" }),
                                " "),
                            react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, null,
                                "       ",
                                react_1["default"].createElement(react_bootstrap_1.Form.Check, { type: "radio", label: "Visa/Master Card (South Africa)" }),
                                " "),
                            react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, null,
                                "       ",
                                react_1["default"].createElement(react_bootstrap_1.Form.Check, { type: "radio", label: "EFT Bank Transfer" }),
                                " "),
                            react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, null,
                                "       ",
                                react_1["default"].createElement(react_bootstrap_1.Form.Check, { type: "radio", label: "Mpesa (Mobile Money)" }),
                                " "))),
                    react_1["default"].createElement(react_bootstrap_1.Card, { className: "mt-3", style: { width: '100%' } },
                        react_1["default"].createElement(react_bootstrap_1.Card.Header, null, "Personal Details"),
                        react_1["default"].createElement(react_bootstrap_1.ListGroup, { variant: "flush" },
                            react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, null,
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicEmail" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Email address"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "email", placeholder: "Enter email" })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicName" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Name"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Name" })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicName" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Display Name (optional)"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Anonymous if blank" })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicName" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Personal Message (Optional)"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Your  Message" }),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Text, { className: "text-muted" }, "This will be displayed on the campaign page."))))),
                    react_1["default"].createElement(react_bootstrap_1.Card, { className: "mt-3", style: { width: '100%' } },
                        react_1["default"].createElement(react_bootstrap_1.Card.Header, null, "Delivery Details"),
                        react_1["default"].createElement(react_bootstrap_1.ListGroup, { variant: "flush" },
                            react_1["default"].createElement(react_bootstrap_1.ListGroup.Item, null,
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicEmail" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Address 1"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Address Line 1" })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicName" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Address 2"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Address 2" })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicName" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Country "),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Country" })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicName" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Postal Code"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Postal Code" })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicName" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "City"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "City" })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { controlId: "formBasicName" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Province"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Province" })),
                                react_1["default"].createElement(react_bootstrap_1.Button, { variant: "secondary", size: "lg", block: true },
                                    "Next Pay  \u00A0 ",
                                    react_1["default"].createElement(ai_1.AiFillCaretRight, null)),
                                react_1["default"].createElement("span", { className: "text-center mt-2" }, "By contributing to this campaign you agree to Thundafunds Terms and Conditions"))))))));
};
exports["default"] = MainComponent;
