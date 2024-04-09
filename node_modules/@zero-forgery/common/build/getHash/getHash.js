"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHash = void 0;
const ethers_1 = require("ethers");
function getHash(str) {
    const hash_one = ethers_1.ethers.utils.keccak256(Buffer.from(str, "utf8"));
    return hash_one;
}
exports.getHash = getHash;
