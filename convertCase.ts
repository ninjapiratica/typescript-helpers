export function convertToCamelCase<T>(obj: T) : T {
    return convertCase(obj, (key) => {
        return key[0].toLowerCase() + key.substr(1);
    });
}

export function convertToPascalCase<T>(obj: T) : T {
    return convertCase(obj, (key) => {
        return key[0].toUpperCase() + key.substr(1);
    });
}

function convertCase<T>(obj: T, convertKey: (key: string) => string) : T {
    if (obj === null || obj === undefined){
        return obj;
    }
    
    if (Array.isArray(obj)) {
        (obj as Array<any>).forEach(val => convertCase(val, convertKey));
    } else if (obj instanceof Date) {
        return obj;
    } else if (typeof obj === 'object') {
        let keys = Object.keys(obj);

        keys.forEach(key => {
            let prop = obj[key];
            let newKey = convertKey(key);

            if (newKey !== key) {
                delete obj[key];
            }
            key = convertKey(key);
            obj[key] = convertCase(prop, convertKey);
        });
    }

    return obj;
}