export function convertToCamelCase<T>(obj: T | T[]) : T | T[] | null {
    return convertCase(obj, (key) => {
        return key[0].toLowerCase() + key.substr(1);
    });
}

export function convertToPascalCase<T>(obj: T | T[]) : T | T[] | null {
    return convertCase(obj, (key) => {
        return key[0].toUpperCase() + key.substr(1);
    });
}

function convertCase<T>(obj: T | T[], convertKey: (key: string) => string) : T | T[] | null {
    if (obj === null || obj === undefined) {
        return null;
    }
    
    if (Array.isArray(obj)) {
        return (obj as Array<T>).map(val => convertCase(val, convertKey) as T);
    } else if (obj instanceof Date) {
        return obj;
    } else if (typeof obj === 'object') {
        let keys = Object.keys(obj);
        let newObj: any = { };

        keys.forEach(key => {
            let prop = (<any>obj)[key];
            let newKey = convertKey(key);
            newObj[newKey] = convertCase(prop, convertKey);
        });

        return newObj;
    }

    return obj;
}