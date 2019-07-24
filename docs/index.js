"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var store_1 = __importDefault(require("./store"));
var menu_1 = __importDefault(require("./components/menu"));
var content_1 = __importDefault(require("./components/content"));
var react_redux_1 = require("react-redux");
var store = store_1.default();
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store },
    react_1.default.createElement(menu_1.default, null),
    react_1.default.createElement(content_1.default, null)), document.getElementById('root'));
//# sourceMappingURL=index.js.map