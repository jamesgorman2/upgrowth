"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var Content = function (_a) {
    var searching = _a.searching, photos = _a.photos, errorMessage = _a.errorMessage;
    return React.createElement(Paper_1.default, null);
};
function stateToProps(state) {
    return state;
}
var ContentContainer = react_redux_1.connect(stateToProps)(Content);
exports.default = ContentContainer;
//# sourceMappingURL=content.js.map