"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationValues = void 0;
const getPaginationValues = (query) => {
    var _a, _b, _c;
    return {
        searchName: (_a = query.searchName) !== null && _a !== void 0 ? _a : '',
        sortBy: (_b = query.sortBy) !== null && _b !== void 0 ? _b : 'createdAt',
        sortDirection: (_c = query.sortDirection) !== null && _c !== void 0 ? _c : 'desc',
        pageNumber: isNaN(+query.pageNumber) ? 1 : +query.pageNumber,
        pageSize: isNaN(+query.pageSize) ? 10 : +query.pageSize,
    };
}; // need more explanation
exports.getPaginationValues = getPaginationValues;
