"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_observable_1 = require("redux-observable");
var rxjs_1 = require("rxjs");
var fetch_1 = require("rxjs/fetch");
var operators_1 = require("rxjs/operators");
var actions_1 = require("./actions");
function executeSearch(searchText) {
    return fetch_1.fromFetch("https://api.unsplash.com/search/photos?query=" + encodeURIComponent(searchText) + "&per_page=20&client_id=12f4913b8696b7013018520cf9094128c0667bcad87043d5d1796948bbaede63").pipe(operators_1.switchMap(function (response) {
        if (response.ok) {
            // OK return data
            return response.json();
        }
        else {
            // Server is returning a status requiring the client to try something else.
            return rxjs_1.throwError({ message: "Error " + response.status });
        }
    }), operators_1.map(function (json) { return json.results; }));
}
exports.defaultState = {
    searching: false
};
function searchReducer(state, action) {
    if (state === void 0) { state = exports.defaultState; }
    switch (action.type) {
        case actions_1.START_SEARCH:
            return {
                searching: true,
                errorMessage: undefined
            };
        case actions_1.END_SEARCH:
            var a = action;
            return {
                searching: false,
                photos: a.photos,
                errorMessage: a.message
            };
        default:
            return state;
    }
}
exports.searchReducer = searchReducer;
function searchEpic(action, state) {
    return action.pipe(redux_observable_1.ofType(actions_1.SEARCH_FOR), operators_1.withLatestFrom(state), operators_1.filter(function (_a) {
        var s = _a[1];
        return !s.searching;
    }), operators_1.mergeMap(function (_a) {
        var action = _a[0];
        return rxjs_1.concat(rxjs_1.of(actions_1.startSearch()), executeSearch(action.path).pipe(operators_1.map(function (photos) { return actions_1.endSearchSuccess(photos); })));
    }), operators_1.catchError(function (err) {
        return rxjs_1.of(actions_1.endSearchFailure(err.message ? err.message.toString() : err.toString()));
    }));
}
exports.searchEpic = searchEpic;
function store() {
    var epicMiddleware = redux_observable_1.createEpicMiddleware();
    // @ts-ignore
    var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
    var store = redux_1.createStore(searchReducer, exports.defaultState, composeEnhancers(redux_1.applyMiddleware(epicMiddleware)));
    epicMiddleware.run(searchEpic);
    return store;
}
exports.default = store;
//# sourceMappingURL=index.js.map