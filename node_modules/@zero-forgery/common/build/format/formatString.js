"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
function format(str) {
    const formatted = str.replace(/[\s*/]+/g, "").toLowerCase();
    return formatted;
}
exports.format = format;
