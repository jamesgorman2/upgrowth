"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEARCH_FOR = 'search_for';
exports.START_SEARCH = 'start_search';
exports.END_SEARCH = 'end_search';
function searchFor(tag) {
    return { type: exports.SEARCH_FOR, tag: tag };
}
exports.searchFor = searchFor;
function startSearch() {
    return { type: exports.START_SEARCH };
}
exports.startSearch = startSearch;
function endSearchSuccess(photos) {
    return { type: exports.END_SEARCH, successful: true, photos: photos };
}
exports.endSearchSuccess = endSearchSuccess;
function endSearchFailure(message) {
    return { type: exports.END_SEARCH, successful: false, message: message };
}
exports.endSearchFailure = endSearchFailure;
//# sourceMappingURL=actions.js.map