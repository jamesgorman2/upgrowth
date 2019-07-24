"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var Search_1 = __importDefault(require("@material-ui/icons/Search"));
var react_redux_1 = require("react-redux");
var actions_1 = require("../store/actions");
var useStyles = core_1.makeStyles(function (theme) {
    var _a, _b, _c;
    return core_1.createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: (_a = {
                flexGrow: 1,
                display: 'none'
            },
            _a[theme.breakpoints.up('sm')] = {
                display: 'block',
            },
            _a),
        search: (_b = {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: styles_1.fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: styles_1.fade(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: '100%'
            },
            _b[theme.breakpoints.up('sm')] = {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
            _b),
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: (_c = {
                padding: theme.spacing(1, 1, 1, 7),
                transition: theme.transitions.create('width'),
                width: '100%'
            },
            _c[theme.breakpoints.up('sm')] = {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
            _c),
    });
});
var Menu = function (_a) {
    var searching = _a.searching, search = _a.search;
    var classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(core_1.AppBar, null,
            react_1.default.createElement(core_1.Toolbar, { variant: "dense" },
                react_1.default.createElement(core_1.Typography, { className: classes.title, variant: "h6", noWrap: true }, "Unsplash Photo Search"),
                react_1.default.createElement("div", { className: classes.search },
                    react_1.default.createElement("div", { className: classes.searchIcon },
                        react_1.default.createElement(Search_1.default, null)),
                    react_1.default.createElement(core_1.InputBase, { placeholder: "Search\u2026", classes: {
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }, inputProps: { 'aria-label': 'Search' } })))),
        react_1.default.createElement(core_1.Toolbar, { variant: "dense" })));
};
function stateToProps(state) {
    return {
        searching: false
    };
}
function dispatchToProps(dispatch) {
    return {
        search: function (tag) {
            dispatch(actions_1.searchFor(tag));
        }
    };
}
var MenuContainer = react_redux_1.connect(stateToProps, dispatchToProps)(Menu);
exports.default = MenuContainer;
//# sourceMappingURL=menu.js.map