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
        return obj;
    }
    if (Array.isArray(obj)) {
        obj.forEach(function (val) { return convertCase(val, convertKey); });
    }
    else if (obj instanceof Date) {
        return obj;
    }
    else if (typeof obj === 'object') {
        var keys = Object.keys(obj);
        keys.forEach(function (key) {
            var anyObj = obj;
            var prop = anyObj[key];
            var newKey = convertKey(key);
            if (newKey !== key) {
                delete anyObj[key];
            }
            key = convertKey(key);
            anyObj[key] = convertCase(prop, convertKey);
        });
    }
    return obj;
}
