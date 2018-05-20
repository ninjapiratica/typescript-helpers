"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertToCamelCase(obj) {
    return convertCase(obj, function (key) {
        return key[0].toLowerCase() + key.substr(1);
    });
}
exports.convertToCamelCase = convertToCamelCase;
function convertToPascalCase(obj) {
    return convertCase(obj, function (key) {
        return key[0].toUpperCase() + key.substr(1);
    });
}
exports.convertToPascalCase = convertToPascalCase;
function convertCase(obj, convertKey) {
    if (obj === null || obj === undefined) {
        return null;
    }
    if (Array.isArray(obj)) {
        return obj.map(function (val) { return convertCase(val, convertKey); });
    }
    else if (obj instanceof Date) {
        return obj;
    }
    else if (typeof obj === 'object') {
        var keys = Object.keys(obj);
        var newObj_1 = {};
        keys.forEach(function (key) {
            var prop = obj[key];
            var newKey = convertKey(key);
            newObj_1[newKey] = convertCase(prop, convertKey);
        });
        return newObj_1;
    }
    return obj;
}
